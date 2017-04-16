function imgsc(pathsrc) {
	var img = new Image();
	img.src = pathsrc;
	img.onload = function() {
		var that = this;
		//生成比例 
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = 480 || w; //480  你想压缩到多大
		h = w / scale;
		//生成canvas
		var canvas = document.createElement('canvas');

		var ctx = canvas.getContext('2d');

		$(canvas).attr({
			width: w,
			height: h
		});

		ctx.drawImage(that, 0, 0, w, h);
		var base64 = canvas.toDataURL('image/jpeg', 1 || 0.8); //1z 表示图片质量，越低越模糊。
		var newBase64 = base64.substring(base64.indexOf('base64,') + 7);
		var url = "http://upload.qiniu.com/putb64/" + fileSize(newBase64); //非华东空间需要根据注意事项 1 修改上传域名
		//	var waiting = plus.nativeUI.showWaiting("正在上传");
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var picUrl = null;
			if(xhr.readyState == 4) {
				var keyText = xhr.responseText;
				/*返回的key是字符串，需要装换成json*/
				keyText = strToJson(keyText);
				/* http://ojvh6i96g.bkt.clouddn.com/是我的七牛云空间网址，keyText.key 是返回的图片文件名*/
				picUrl = "http://ol50hs8te.bkt.clouddn.com/" + keyText.key;
				console.log(picUrl);
				var stateing=app.getState();
					stateing.picUrl=picUrl;
					app.setState(stateing);

			}
		}
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/octet-stream");
		xhr.setRequestHeader("Authorization", "UpToken VgP0rGFw2ucs3SnhTB7AUax6DZlj0bFF4BOAAeq5:KlaLkem5WCLI3p8iqzrgC_9HfNA=:eyJzY29wZSI6IndlbndlbiIsImRlYWRsaW5lIjoxNTcwNjM2ODAwfQ==");
		xhr.send(newBase64);

	}

}
/*把字符串转换成json*/
function strToJson(str) {
	var json = eval('(' + str + ')');
	return json;
}

/*通过base64编码字符流计算文件流大小函数*/
function fileSize(str) {
	var fileSize;
	if(str.indexOf('=') > 0) {
		var indexOf = str.indexOf('=');
		str = str.substring(0, indexOf); //把末尾的’=‘号去掉
	}

	fileSize = parseInt(str.length - (str.length / 8) * 2);
	return fileSize;
}