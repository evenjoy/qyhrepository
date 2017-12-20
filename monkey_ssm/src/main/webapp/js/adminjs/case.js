$(function(){
	//注册新增按钮事件
	$("#addbutton").click(function(){
		$("#list").css("display","none");
		$("#add").css("display","block");
	});
	//注册列表按钮事件
	$("#listbutton").click(function(){
		$("#list").css("display","block");
		$("#add").css("display","none");
	});
	
	
});