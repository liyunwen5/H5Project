function muiAjax(url,sendData,callback){
	var dataValues = {};
	mui.ajax(url, {
		data: sendData,
		dataType: 'json', //服务器返回json格式数据
		async: false, //同步
		type: 'post', //HTTP请求类型
		//								timeout:5000,//超时时间设置为10秒；
		beforeSend:callback,
		success: function(data) {
			console.log(JSON.stringify(data));
			//服务器返回响应，根据响应结果，分析是否登录成功；
//			var success = data.success;
//			if(success) {
//			alert(JSON.stringify('1 '+data));
				dataValues = data;
//			} else {
//				plus.nativeUI.toast(data.msg);
//			}
		},
//		error: function(xhr, type, errorThrown) {
//			plus.nativeUI.toast("服务器连接失败！");
//		}
	});
//	alert(JSON.stringify('2 '+JSON.stringify(dataValues)));
	return dataValues;
}
