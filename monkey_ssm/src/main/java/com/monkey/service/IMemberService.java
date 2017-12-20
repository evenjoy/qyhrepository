package com.monkey.service;

import com.monkey.entity.Member;
import com.monkey.vo.Page;
import com.monkey.vo.Result;

public interface IMemberService {
	
	//分页查询用户
	public Result findAllMemberByPage(Page page);
	//查询用户名是否存在
	public Result findMemberByName(String memberName);
	//添加工作室成员
	public Result addMember(Member member);
	//删除成员
	public Result deleteMemberBymemberId(String memberId);
	//查询成员
	public Result findMemberById(String memberId);
	//修改成员
	public Result updateMember(Member member);
}
