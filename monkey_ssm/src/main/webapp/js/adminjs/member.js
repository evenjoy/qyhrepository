var memberId;
var currentpage;
$(function(){
	examine();
	editexamine()
	//注册分类按钮
	$("#member_type button").click(function(){
		$("#member_type .active").removeClass("active");
		$(this).addClass("active");
		findmemberByPage(1);
	});
	//注册查询按钮
	$("#member_search_btn").click(function(){
		findmemberByPage(1);
	});
	//注册删除模态款确定事件
	$("#delete_member_btn").click(function(){
		$("#deletemodal").modal("hide");
		return deletemember();
	});
	//分页查询用户信息
	findmemberByPage(1);
});
function findmemberByPage(currentPage){
	//获取模糊关键字
	var keyWord = $("#member_search").val();
	//获取分类关键字
	var type = $("#member_type .active").html();
	$.ajax({
		url:basePath+"member/MemberPage",
		type:"get",
		data:{"currentPage":currentPage,"keyWord":keyWord,"type":type},
		dataType:"json",
		success:function(result){
			$("#member_table tbody").html("");
			$("#member_page").html("");
			if(result.status==0){
				var page=result.data;
				var Member = page.data;
				$(Member).each(function(n,value){
					var tr='<tr>'+
	                '<td>'+(n+1)+'</td>'+
	                '<td>'+value.loginName+'</td>'+
	                '<td>'+value.memberName+'</td>'+
	                '<td>'+value.sex+'</td>'+
	                '<td>'+value.memberType+'</td>'+
	                '<td>'+value.phone+'</td>'+
	                '<td>'+value.jointime+'</td>'+
	                '<td>'+
	                '<a href="" onclick=updatememberclick("'+value.id+'") data-toggle="modal" data-target="#editmember"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>&nbsp;'+
	                  '<a href="" onclick=deletememberclick("'+value.id+'") data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
	                '</td>'+
	              '</tr>';
					$("#member_table tbody").append(tr);
				});
				//处理分页条
				if(page.aNum.length>0){
					//处理前一页
					var previous='<li>'+
			            '<a href="javascript:findmemberByPage('+page.previousPage+')" aria-label="Previous">'+
		              '<span aria-hidden="true">&laquo;</span>'+
		            '</a>'+
		          '</li>';
					$("#member_page").append(previous);
					//处理中间页数字
					$(page.aNum).each(function(n,value){
						var middle='<li><a href="javascript:findmemberByPage('+value+')">'+value+'</a></li>';
						$("#member_page").append(middle);
					});
					//处理下一页
					var next='<li>'+
			            '<a href="javascript:findmemberByPage('+page.nextPage+')" aria-label="Next">'+
		              '<span aria-hidden="true">&raquo;</span>'+
		            '</a>'+
		          '</li>';
					$("#member_page").append(next);
				}
				currentpage=page.currentPage;
			}else if(result.status==1){
				$("#member_table tbody").html(result.message);
			}	
		},
		error:function(){
			alert("请求失败");
		}
	});
}
//提交表单
function registermember(){
	//获取数据
	var memberloginName=$("#memberloginName").val();
	var memberpassword=$("#memberPassword").val();
	var memberName = $("#membername").val();
	var memberphone = $("#memberphone").val();
	var jointime = $("#jointime").val();
	jointime =jointime.replace("/","-").replace("/","-");
	var membersex= $("#sex input:checked").val();
	var type= $("#type input:checked").val();
	$.ajax({
		url:basePath+"member/newmember",
		type:"post",
		data:{"loginName":memberloginName,"loginPassword":memberpassword,"memberType":type,"sex":membersex,"phone":memberphone,"memberName":memberName,"jointime":jointime},
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
//编辑用户校验
function examine(){
	var memberloginName_flag = false;
	var memberPassword_flag = false;
	var memberPassword2_flag = false;
	var membername_flag = false;
	var memberphone_flag = false;
		//校验用户名
	$("#memberloginName").change(function(){
		var memberloginName=$("#memberloginName").val();
		if($("#memberloginName").val()==""){
			$("#memberloginName+span").html('<span class="glyphicon glyphicon-remove-circle">用户名不能为空</span>').css("color","red");
			memberloginName_flag = false;
		}else{
			$.ajax({
				url:basePath+"member/findmemberName",
				type:"get",
				data:{"memberloginName":memberloginName},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						$("#memberloginName+span").html("");
						$("#memberloginName+span").html('<span class="glyphicon glyphicon-remove-circle">用户名已存在</span>').css("color","red");
						memberloginName_flag = false;
					}else if(result.status==1){
						$("#memberloginName+span").html("");
						$("#memberloginName+span").html('<span class="glyphicon glyphicon-ok-circle">用户名可用</span>').css("color","green");
						memberloginName_flag = true;
					}
				},
				error:function(){
					alert("请求失败");
				}
			});	
		}
	});
	//校验密码
	$("#memberPassword").focusout(function(){
		if($("#memberPassword").val()==""){
			$("#memberPassword+span").html('<span class="glyphicon glyphicon-remove-circle">密码不能为空</span>').css("color","red");
			var memberPassword_flag = false;
		}else{
			$("#memberPassword+span").html("");
			if($("#memberPassword2").val()!=$("#memberPassword").val()){
				$("#memberPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">两次密码不一致</span>').css("color","red");
				var memberPassword_flag = false;
			}else{
				$("#memberPassword2+span").html("");
				memberPassword_flag = true;
			}
		}
	});
	//校验密码2
	$("#memberPassword2").focusout(function(){
		if($("#memberPassword2").val()==""){
			$("#memberPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">确认密码不能为空</span>').css("color","red");
			memberPassword2_flag = false;
			memberPassword_flag = false;
		}else{
			if($("#memberPassword2").val()!=$("#memberPassword").val()){
				$("#memberPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">两次密码不一致</span>').css("color","red");
				memberPassword2_flag = false;
				memberPassword_flag = false;
			}else{
				$("#memberPassword2+span").html("");
				memberPassword2_flag = true;
				memberPassword_flag = true;
			}
		}
	});
	//校验昵称
	$("#membername").focusout(function(){
		if($("#membername").val()==""){
			$("#membername+span").html('<span class="glyphicon glyphicon-remove-circle">昵称不能为空</span>').css("color","red");
			membername_flag = false;
		}else{
			$("#membername+span").html("");
			membername_flag = true;
		}
	});
	//校验电话
	$("#memberphone").focusout(function(){
		if($("#memberphone").val()==""){
			$("#memberphone+span").html('<span class="glyphicon glyphicon-remove-circle">联系电话不能为空</span>').css("color","red");
			memberphone_flag = false;
		}else{
			$("#memberphone+span").html("");
			memberphone_flag = true;
		}
	});
	//表单提交事件
	$("#register_from").submit(function(){
		if(memberloginName_flag && memberPassword_flag && memberPassword2_flag && membername_flag && memberphone_flag){
			return registermember();
		}else{
			return alert("请确认信息是否正确！！");
		}
	});
}
//校验表单
function editexamine(){
	var editmemberName_flag = true;
	var editmemberPassword_flag = true;
	var editmemberPassword2_flag = true;
	var editmembername_flag = true;
	var editmemberphone_flag = true;
	//校验用户名
	$("#edit #memberloginName").change(function(){
		var memberloginName=$("#edit #memberloginName").val();
		if($("#edit #memberloginName").val()==""){
			$("#edit #memberloginName+span").html('<span class="glyphicon glyphicon-remove-circle">用户名不能为空</span>').css("color","red");
			editmemberName_flag = false;
		}else{
			$.ajax({
				url:basePath+"member/findmemberName",
				type:"get",
				data:{"memberloginName":memberloginName},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						$("#edit #memberloginName+span").html("");
						$("#edit #memberloginName+span").html('<span class="glyphicon glyphicon-remove-circle">用户名已存在</span>').css("color","red");
						editmemberName_flag = false;
					}else if(result.status==1){
						$("#edit #memberloginName+span").html("");
						$("#edit #memberloginName+span").html('<span class="glyphicon glyphicon-ok-circle">用户名可用</span>').css("color","green");
						editmemberName_flag = true;
					}
				},
				error:function(){
					alert("请求失败");
				}
			});
		}
	});
	//校验密码
	$("#edit #memberPassword").change(function(){
		if($("#edit #memberPassword").val()==""){
			$("#edit #memberPassword+span").html('<span class="glyphicon glyphicon-remove-circle">密码不能为空</span>').css("color","red");
			editmemberPassword_flag = false;
		}else{
			$("#edit #memberPassword+span").html("");
			if($("#edit #memberPassword2").val()!=$("#edit #memberPassword").val()){
				$("#edit #memberPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">两次密码不一致</span>').css("color","red");
				editmemberPassword_flag = false;
			}else{
				$("#edit #memberPassword2+span").html("");
				editmemberPassword_flag = true;
			}
		}
	});
	//校验密码2
	$("#edit #memberPassword2").change(function(){
		if($("#edit #memberPassword2").val()==""){
			$("#edit #memberPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">确认密码不能为空</span>').css("color","red");
			editmemberPassword_flag = false;
			editmemberPassword2_flag = false;
		}else{
			if($("#edit #memberPassword2").val()!=$("#edit #memberPassword").val()){
				$("#edit #memberPassword2+span").html('<span class="glyphicon glyphicon-remove-circle">两次密码不一致</span>').css("color","red");
				editmemberPassword_flag = false;
				editmemberPassword2_flag = false;
			}else{
				$("#edit #memberPassword2+span").html("");
				editmemberPassword2_flag = true;
				editmemberPassword_flag = true;
			}
		}
	});
	//校验昵称
	$("#edit #membername").change(function(){
		if($("#edit #membername").val()==""){
			$("#edit #membername+span").html('<span class="glyphicon glyphicon-remove-circle">昵称不能为空</span>').css("color","red");
			editmembername_flag = false;
		}else{
			$("#edit #membername+span").html("");
			editmembername_flag = true;
		}
	});
	//校验电话
	$("#edit #memberphone").change(function(){
		if($("#edit #memberphone").val()==""){
			$("#edit #memberphone+span").html('<span class="glyphicon glyphicon-remove-circle">联系电话不能为空</span>').css("color","red");
			editmemberphone_flag = false;
		}else{
			$("#edit #memberphone+span").html("");
			editmemberphone_flag = true;
		}
	});
	//表单提交事件
	$(".form-horizontal").submit(function(){
		if(editmemberName_flag && editmemberPassword_flag && editmemberPassword2_flag && editmembername_flag && editmemberphone_flag){
			return updatemember();
		}else{
			alert("请确认信息是否正确！！");
			
		}
	});
}
//删除用户
function deletememberclick(id){
	memberId = id;
}
function deletemember(){
	$.ajax({
		url:basePath+"member/deletemember/"+memberId,
		type:"delete",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
				findmemberByPage(currentpage);
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
//获取编辑用户的信息
function updatememberclick(id){
	$.ajax({
		url:basePath+"/member/member/"+id,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				var member = result.data;
				memberId=member.id;
				$("#edit #memberloginName").val(member.loginName);
				$("#edit #memberPassword").val(member.loginPassword);
				$("#edit #memberPassword2").val(member.loginPassword);
				$("#edit #membername").val(member.memberName);
				$("#edit #memberphone").val(member.phone);
				$("#edit #jointime").val(member.jointime);
				$("#edit #sex input").each(function(n,value){
					if(member.sex==$(value).val()){
						$(value).attr("checked","checked");
					}
				});
				$("#edit #type input").each(function(n,value){
					if(member.memberType==$(value).val()){
						$(value).attr("checked","checked");
					}
				});
		
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
}
function updatemember(){
	//获取数据
	var memberloginName=$("#edit #memberloginName").val();
	var memberpassword=$("#edit #memberPassword").val();
	var memberName = $("#edit #membername").val();
	var memberphone = $("#edit #memberphone").val();
	var jointime = $("#edit #jointime").val();
	jointime =jointime.replace("/","-").replace("/","-");
	var membersex= $("#edit #sex input:checked").val();
	var type= $("#edit #type input:checked").val();
	$.ajax({
		url:basePath+"member/updatemember",
		type:"post",
		data:{"id":memberId,"loginName":memberloginName,"loginPassword":memberpassword,"memberType":type,"sex":membersex,"phone":memberphone,"memberName":memberName,"jointime":jointime},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert("修改成功");
				findmemberByPage(currentpage);
				$("#editmember").modal("hide");
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