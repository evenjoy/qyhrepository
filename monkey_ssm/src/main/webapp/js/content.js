/* CSS Document */
$(function(){
	//注册点击事件
	load();
});
function load(){
	$("#nav li").click(function(){
		//设置单击的li选中
		$(this).siblings("li").removeClass("active");
		$(this).addClass("active");
		//更换正文
		var target = $(this).children("a").attr("name");
		$('#content').load("page/indexpage/"+target+".html");
		//为正文页面远程加载js
		$.getScript("js/indexjs/"+target+".js");
	});
}