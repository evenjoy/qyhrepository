var Editor1=undefined;
var Editor2=undefined;
var currentPage=1;
$(function(){
	KindEditor.ready(function(K) {
		var editor1 = K.create('textarea[name="content1"]', {
			cssPath : 'kindeditor/plugins/code/prettify.css',
			uploadJson : 'kindeditor/jsp/upload_json.jsp',
			fileManagerJson : 'kindeditor/jsp/file_manager_json.jsp',
			allowFileManager : true
		});
		var editor2 = K.create('textarea[name="content2"]', {
			cssPath : 'kindeditor/plugins/code/prettify.css',
			uploadJson : 'kindeditor/jsp/upload_json.jsp',
			fileManagerJson : 'kindeditor/jsp/file_manager_json.jsp',
			allowFileManager : true
		});
		Editor1 = editor1;
		Editor2 = editor2;
		prettyPrint();
	});
	//加载案例数据
	selectallcase(1);
	//注册新增按钮事件
	$("#addbutton").click(function(){
		$("#list").css("display","none");
		$("#add").css("display","block");
		$("#update").css("display","none");
		$("#detail").css("display","none");
	});
	//注册列表按钮事件
	$("#listbutton").click(function(){
		changetolist();
	});
	//提交按钮事件注册
	$("#add form").submit(function(){
		addcase();
		return false;
	});
	//提交按钮事件注册（修改）
	$("#update form").submit(function(){
		updatecase();
		return false;
	});
});
//添加案例
function addcase(){
	var name=$("#add #casename").val();
	var unit=$("#add #caseunit").val();
	var lasttime=$("#add #caselasttime").val();
	var href=$("#add #casehref").val();
	var desc = Editor1.html();
	//校验是否正确
	var message=addexnmine(name,unit,lasttime,href,desc);
	if(message==""){
		//校验成功  发送请求
		$.ajax({
			url:basePath+"case/addcase",
			type:"post",
			data:{"name":name,"unit":unit,"lasttime":lasttime,"href":href,"desc":desc},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					alert(result.message);
					$("#add #casename").val("");
					$("#add #caseunit").val("");
					$("#add #caselasttime").val("");
					$("#add #casehref").val("");
					Editor1.html("");
				}else if(result.status==1){
					alert(result.message);
				}
			},
			
			error:function(){
				alert("请求失败");
			}
		});
	}else{
		alert(message);
	}
}
//加载案例数据
function selectallcase(currentpage){
	$.ajax({
		url:basePath+"case/showCase/"+currentpage,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				//查询成功dom操作写数据
				var list =$("#list_content");
				var pageNum=$("#pageNum");
				list.html("");
				pageNum.html("");
				var page = result.data;
				var cases = page.data;
				$(cases).each(function(n,value){
					var list_div='<div class="col-sm-6 col-md-4">'+
					'<div class="thumbnail" style="width: 350px; height: 300px;">'+
						'<img data-src="holder.js/300x200" alt="..." style="width: 340px; height: 150px; background: red;">'+
						'<div class="caption">'+
							'<h3>'+value.name+'</h3>'+
							'<p></p>'+
							'<p>所属单位：'+value.unit+'</p>'+
							'<p>'+
								'<a href="'+value.href+'">连接此网站</a>&nbsp;&nbsp;&nbsp; <a href="javascript:showdetail(\''+value.id+'\')";>详情</a>&nbsp;&nbsp;&nbsp;'+
								'<a href="javascript:updateload(\''+value.id+'\')">编辑</a>&nbsp;&nbsp;&nbsp; <a href="javascript:deleteCase(\''+value.id+'\')">删除</a>'+
							'</p>'+
						'</div>'+
					'</div>'+
				'</div>';
					list.append(list_div);
				});
				//处理分页条
				if(page.aNum.length>0){
					//处理前一页
					var previous='<li>'+
			            '<a href="javascript:selectallcase('+page.previousPage+')" aria-label="Previous">'+
		              '<span aria-hidden="true">&laquo;</span>'+
		            '</a>'+
		          '</li>';
					pageNum.append(previous);
					//处理中间页数字
					$(page.aNum).each(function(n,value){
						var middle='<li><a href=javascript:selectallcase('+value+')>'+value+'</a></li>';
						pageNum.append(middle);
					});
					
					//处理下一页
					var next='<li>'+
			            '<a href="javascript:selectallcase('+page.nextPage+')" aria-label="Next">'+
		              '<span aria-hidden="true">&raquo;</span>'+
		            '</a>'+
		          '</li>';
					pageNum.append(next);
				}
				currentPage=currentpage;
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
			alert("数据加载失败，请刷新重试！");
		}	
	});
}
//显示详情
function showdetail(id){
	$("#list").css("display","none");
	$("#add").css("display","none");
	$("#update").css("display","none");
	$("#detail").css("display","block");
	$.ajax({
		url:basePath+"case/showdetail/"+id,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				var cases=result.data;
				var detail=$("#detail");
				detail.html("");
				var detail_content='<h2>'+cases.name+'</h2>'+
							'<br/>'+
			'<p>所属单位：'+cases.unit+'&nbsp;&nbsp;&nbsp;&nbsp;项目结束日期：'+cases.lasttime+'</p>'+
			'<div class="container" id=detail_content style="border-top:1px solid #666;border-bottom:1px solid #666; padding:10px 0px 10px 0px; text-align:left">'+cases.desc+'</div>';
			detail.html(detail_content);
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
			alert("查询详情失败！");
		}
	});
}
//加载修改信息
function updateload(id){
	$("#list").css("display","none");
	$("#add").css("display","none");
	$("#update").css("display","block");
	$("#detail").css("display","none");
	$.ajax({
		url:basePath+"case/showdetail/"+id,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				var casess=result.data;
				$("#update #caseid").html(casess.id);
				$("#update #casename").val(casess.name);
				$("#update #caseunit").val(casess.unit);
				$("#update #caselasttime").val(casess.lasttime);
				$("#update #casehref").val(casess.href);
				Editor2.html(casess.desc);
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
			alert("获取信息失败！");
		}
	});
}
//修改案例信息
function updatecase(){
	var id=$("#update #caseid").html();
	var name=$("#update #casename").val();
	var unit=$("#update #caseunit").val();
	var lasttime=$("#update #caselasttime").val();
	var href=$("#update #casehref").val();
	var desc = Editor2.html();
	//校验是否正确
	var message=addexnmine(name,unit,lasttime,href,desc);
	if(message==""){
		$.ajax({
			url:basePath+"case/updatecase",
			type:"post",
			data:{"id":id,"name":name,"unit":unit,"lasttime":lasttime,"href":href,"desc":desc},
			dataType:"json",
			success:function(result){
				alert(result.message);
				selectallcase(currentPage);
				changetolist();
			},
			error:function(){
				alert("请求失败");
			}
		});
	}else{
		alert(message);
	}
};
//删除案例
function deleteCase(id){
	$.ajax({
		url:basePath+"/case/deleteCase/"+id,
		type:"delete",
		dateType:"json",
		success:function(result){
			alert(result.message);
			selectallcase(currentPage);
		},
		error:function(){
			alert("请求失败！")
		}
		
	});
}
//校验信息
function addexnmine(name,unit,lasttime,href,desc){
	var message="";
	if(name==""){
		message+="案例名不能为空！\n";
	}
	if(unit==""){
		message+="所属单位不能为空 ！\n";
	}
	if(lasttime==""){
		message+="结束时间不能为空！\n";
	}
	if(href==""){
		message+="连接地址不能为空！\n";
	}
	if(desc==""){
		message+="内容不能为空！\n";
	}
	return message;
}
//切换至列表
function changetolist(){
	$("#list").css("display","block");
	$("#add").css("display","none");
	$("#update").css("display","none");
	$("#detail").css("display","none");
}