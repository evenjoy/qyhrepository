var User;
var Member
$(function(){
	//加载登录信息
	loadUserMessage();

});
function loadUserMessage(){
	$.ajax({
		url:basePath+"user/userMessage/get",
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				User=result.data;
			}else if(result.status=1){
				Member=result.data;
			}
			//设置登录信息
			loadloginmessage();
		},
		error:function(){
			alert("加载失败");
		}
	});
}
function loadloginmessage(){
	if(User!=undefined){
		$(".login").html("");
		var ul='<li ><a href="#about">'+User.nickName+'</a></li>'+
            '<li ><a href="#about" onclick=loginout("User")>注销</a></li>';
		$(".login").append(ul);
	}else if(Member!=undefined){
		$(".login").html("");
		var ul='<li ><a href="#about">'+Member.memberName+'</a></li>'+
			'<li ><a href="admin.html">进入后台管理</a></li>'+
            '<li ><a href="#about" onclick=loginout("Member")>注销</a></li>';
		$(".login").append(ul);
	}
}
function loginout(type){
	$.ajax({
		url:basePath+"user/userMessage/delete",
		type:"get",
		dataType:"json",
		success:function(result){
			if('User'==type){
				User=undefined;
				$(".login").html("");
				var ul=' <li ><a href="login.html">登录</a></li>'+
		            '<li ><a href="register.html">注册</a></li>';
				$(".login").append(ul);
			}
			if('Member'==type){
				User=undefined;
				$(".login").html("");
				var ul=' <li ><a href="login.html">登录</a></li>'+
		            '<li ><a href="register.html">注册</a></li>';
				$(".login").append(ul);
			}
		},
		error:function(){
			alert("加载失败");
		}
	});
	
}