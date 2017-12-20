var userId;
var currentpage;
$(function(){
	examine();
	//注册分类按钮
	$("#user_type button").click(function(){
		$("#user_type .active").removeClass("active");
		$(this).addClass("active");
		findUserByPage(1);
	});
	//注册查询按钮
	$("#user_search_btn").click(function(){
		findUserByPage(1);
	});
	//注册删除模态款确定事件
	$("#delete_user_btn").click(function(){
		$("#deletemodal").modal("hide");
		return deleteUser();
	});
	//分页查询用户信息
	findUserByPage(1);
});
function findUserByPage(currentPage){
	//获取模糊关键字
	var keyWord = $("#user_search").val();
	//获取分类关键字
	var type = $("#user_type .active").html();
	$.ajax({
		url:basePath+"user/userPage",
		type:"get",
		data:{"currentPage":currentPage,"keyWord":keyWord,"type":type},
		dataType:"json",
		success:function(result){
			$("#user_table tbody").html("");
			$("#user_page").html("");
			if(result.status==0){
				var page=result.data;
				var users = page.data;
				$(users).each(function(n,value){
					var tr='<tr>'+
	                '<td>'+(n+1)+'</td>'+
	                '<td>'+value.userloginName+'</td>'+
	                '<td>'+value.nickName+'</td>'+
	                '<td>'+value.sex+'</td>'+
	                '<td>'+value.type+'</td>'+
	                '<td>'+value.phone+'</td>'+
	                '<td>'+new Date(value.regdate).toLocaleDateString().replace("/","-").replace("/","-")+'</td>'+
	                '<td>'+
	                  '<a href="" onclick=deleteUserclick("'+value.id+'") data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
	                '</td>'+
	              '</tr>';
					$("#user_table tbody").append(tr);
				});
				//处理分页条
				if(page.aNum.length>0){
					//处理前一页
					var previous='<li>'+
			            '<a href="javascript:findUserByPage('+page.previousPage+')" aria-label="Previous">'+
		              '<span aria-hidden="true">&laquo;</span>'+
		            '</a>'+
		          '</li>';
					$("#user_page").append(previous);
					//处理中间页数字
					$(page.aNum).each(function(n,value){
						var middle='<li><a href="javascript:findUserByPage('+value+')">'+value+'</a></li>';
						$("#user_page").append(middle);
					});
					//处理下一页
					var next='<li>'+
			            '<a href="javascript:findUserByPage('+page.nextPage+')" aria-label="Next">'+
		              '<span aria-hidden="true">&raquo;</span>'+
		            '</a>'+
		          '</li>';
					$("#user_page").append(next);
				}
				currentpage=page.currentPage;
			}else if(result.status==1){
				$("#user_table tbody").html(result.message);
			}	
		},
		error:function(){
			alert("请求失败");
		}
	});
}
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
				alert("添加成功")
				return true;
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
			return alert("请确认信息是否正确！！");
			
		}
	});
}
//删除用户
function deleteUserclick(id){
	userId = id;
}
function deleteUser(){
	$.ajax({
		url:basePath+"user/deleteUser/"+userId,
		type:"delete",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
				findUserByPage(currentpage);
			}else if(result.status==1){
				alert(result.message);
			}
			return;
		},
		error:function(){
			alert("请求失败")
		}
	});
}