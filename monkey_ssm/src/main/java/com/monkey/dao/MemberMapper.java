package com.monkey.dao;

import com.monkey.entity.Member;
import com.monkey.util.IPageclass;
import com.monkey.vo.Result;

public interface MemberMapper extends IPageclass<Member>{
	//登录
	public Member login(Member member);
	//获取总记录数（继承自ipageclass）
	//获取分页数据（继承自ipageclass）
	//校验用户名是否存在
	public String findMemberByName(String loginName);
	//添加工作室成员
	public int addMember(Member member);
	//删除工作室成员
	public int deleteMeberById(String memberId);
	//查询成员
	public Member findMemberById(String memberId);
	//修改成员信息
	public int updateMember(Member member);
}
