$(function(){
	//登录事件注册
	$(".form").submit(function(){
		return login();
	});
});
function login(){
	var userloginName = $("#userName").val();
	var userPassword = $("#userPassword").val();
	var type = $("#type input:checked").val();
	$.ajax({
		url:basePath+"user/login",
		type:"get",
		data:{"userloginName":userloginName,"userPassword":userPassword,"logintype":type},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				if(result.message=="普通用户"){
					User = result.data;
				}else if(result.message=="工作室成员"){
					member = result.data;
				}
                window.location.href="index.html";
            }else if(result.status==1){
                alert(result.message);
            }
		},
		error:function(){
			alert("请求失败");
		}
	});
	return false;
}