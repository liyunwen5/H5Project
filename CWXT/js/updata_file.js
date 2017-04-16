
var wgtVer = null;

function plusReady() {
	// ......
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;
		console.log("当前应用版本：" + wgtVer);
		checkUpdate();
	});
}
//版本更新
function bbgx() {
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}
}

// 检测更新
var checkUrl = "http://220.171.1.50:9012/jfarm/tcustommobileController.do?appUpdate&params=cwxt";

function checkUpdate() {

		plus.nativeUI.showWaiting("检测更新...");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		
		switch(xhr.readyState) {
			case 4:
				plus.nativeUI.closeWaiting();
				if(xhr.status == 200) {
	var newVer = JSON.parse(xhr.responseText).version;
	var btnArray = ['更新', '取消'];
	if(wgtVer && newVer && (wgtVer != newVer)) {
		
		console.log(wgtVer + "-----" + newVer);
	mui.confirm('版本更新', '请问需要更新版本吗？', btnArray, function(e) {
		console.log(e.index);
		if(e.index == 1) {
			
			plus.nativeUI.toast("不是最新版本");
		} else {
			downWgt(); // 下载升级包
			}
		})
	} else {
		plus.nativeUI.toast("是最新版本！");
		}
	
	} else {
		console.log("检测更新失败！");
	plus.nativeUI.toast("检测更新失败！");
				}
				break;
			default:
				break;
		}
	}
	xhr.open('GET', checkUrl);
	
		xhr.send();
}
var wgtUrl = "http://220.171.1.50:9012/jfarm/commonController.do?apkDownload&params=cwxt";

function downWgt() {
	plus.nativeUI.showWaiting("记账本...");
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		if(status == 200) {
			console.log("记账本：" + d.filename);
			installWgt(d.filename); // 安装wgt包
		} else {
			console.log("记账本！");
			plus.nativeUI.toast("记账本！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}
// 更新应用资源
function installWgt(path) {
	plus.nativeUI.showWaiting("十团·智慧社区文件...");
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		console.log("十团·智慧社区文件成功！");
		plus.nativeUI.toast("应用资源更新完成！");
		plus.runtime.restart();

	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("十团·智慧社区文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.toast("十团·智慧社区件失败[" + e.code + "]：" + e.message);
	});
}