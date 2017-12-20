$(function(){
	examine();
	
});
//提交表单
function registerUser(){
	//获取数据
	var userloginName=$("#userName").val();
	var userpassword=$("#userPassword").val();
	var usernickName = $("#userNickname").val();
	var userphone = $("#userphone").val();
	var usersex= $("#sex input:checked").val();
	var type= $("#type input:checked").val();
	$.ajax({
		url:basePath+"user/newUser",
		type:"post",
		data:{"userloginName":userloginName,"userPassword":userpassword,"type":type,"sex":usersex,"phone":userphone,"nickName":usernickName},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
				window.location.href="login.html";
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
//校验表单
function examine(){
	var userName_flag = false;
	var userPassword_flag = false;
	var userPassword2_flag = false;
	var userNickname_flag = false;
	var userphone_flag = false;
	//校验用户名
	$("#userName").change(function(){
		var userName=$("#userName").val();
		if($("#userName").val()==""){
			$("#userName+span").html('<span class="glyphicon glyphicon-remove-circle">用户名不能为空</span>').css("color","red");
		}else{
			$.ajax({
				url:basePath+"user/finduserName",
				type:"get",
				data:{"userName":userName},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						$("#userName+span").html("");
						$("#userName+span").html('<span class="glyphicon glyphicon-remove-circle">用户名已存在</span>').css("color","red");
						userName_flag = false;
					}else if(result.status==1){
						$("#userName+span").html("");
						$("#userName+span").html('<span class="glyphicon glyphicon-ok-circle">用户名可用</span>').css("color","green");
						userName_flag = true;
					}
				},
				error:function(){
					alert("请求失败");
				}
			});
			userName_flag = true;
		}
	});
	//校验密码
	$("#userPassword").focusout(function(){
		if($("#userPassword").val()==""){
			$("#userPassword+span").html('<span class="glyphicon glyphicon-remove-circle">密码不能为空</span>').css("color","red");
		}else{
			$("#userPassword+span").html("");
			if($("#userPassword2").val()!=$("#userPassword").val()){
				$("#userPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">两次密码不一致</span>').css("color","red");
			}else{
				$("#userPassword2+span").html("");
				userPassword_flag = true;
			}
		}
	});
	//校验密码2
	$("#userPassword2").focusout(function(){
		if($("#userPassword2").val()==""){
			$("#userPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">确认密码不能为空</span>').css("color","red");
		}else{
			if($("#userPassword2").val()!=$("#userPassword").val()){
				$("#userPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">两次密码不一致</span>').css("color","red");
			}else{
				$("#userPassword2+span").html("");
				userPassword2_flag = true;
				userPassword_flag = true;
			}
		}
	});
	//校验昵称
	$("#userNickname").focusout(function(){
		if($("#userNickname").val()==""){
			$("#userNickname+span").html('<span class="glyphicon glyphicon-remove-circle">昵称不能为空</span>').css("color","red");
		}else{
			$("#userNickname+span").html("");
			userNickname_flag = true;
		}
	});
	//校验电话
	$("#userphone").focusout(function(){
		if($("#userphone").val()==""){
			$("#userphone+span").html('<span class="glyphicon glyphicon-remove-circle">联系电话不能为空</span>').css("color","red");
		}else{
			$("#userphone+span").html("");
			userphone_flag = true;
		}
	});
	//表单提交事件
	$("#register_from").submit(function(){
		if(userName_flag && userPassword_flag && userPassword2_flag && userNickname_flag && userphone_flag){
			return registerUser();
		}else{
			alert("请确认信息是否正确！！");
			return false;
		}
		
	});
}
