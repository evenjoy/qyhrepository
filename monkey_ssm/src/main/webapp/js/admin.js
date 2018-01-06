$(function(){
	load();
});
function load(){
	$("#nav li").click(function(){
		//设置单击的li选中
		//更换正文
		var target = $(this).children("a").attr("name");
		$('.container').load("page/adminpage/"+target+".html");
	});
}