/**
 * 封装的简易ajax库
 * haohao
 * 2017.11.15
 * 注释文件在练习代码ajax文件夹myajax.html
 * open参数已默认true,全部异步
 **/
let ajax = function (type, url, senddata, success) {

	if(window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	} else {
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(arguments[0] == 'get') {
		url += '?' + senddata + '&huancun:' + new Date().getTime()
		oAjax.open(type, url, true);
		oAjax.send();
	} else if(arguments[0] == 'post') {
		oAjax.open(type, url, true);
		oAjax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		oAjax.send(senddata);
	}
	oAjax.onreadystatechange = function() {
		if(oAjax.readyState == 4) {
			if(oAjax.status == 200) {
				success(oAjax.responseText);
			} else {
				console.log('失败了:' + oAjax.status);
			}
		}
	}
};
//导出 并挂载到vue原型上
/*export default {
  install: function (vm) {
    vm.prototype.ajax= ajax;
    vm.prototype.bLogin=false;
  }
}*/