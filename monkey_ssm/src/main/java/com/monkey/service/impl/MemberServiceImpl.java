package com.monkey.service.impl;

import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.monkey.dao.MemberMapper;
import com.monkey.entity.Member;
import com.monkey.service.IMemberService;
import com.monkey.util.PageUtil;
import com.monkey.util.UUIDUtil;
import com.monkey.vo.Page;
import com.monkey.vo.Result;
@Service("memberService")
public class MemberServiceImpl implements IMemberService {
	@Resource(name="memberMapper")
	private MemberMapper memberMapper;
	@Resource(name="pageUtil")
	private PageUtil pageUtil;
	
	@Override
	public Result findAllMemberByPage(Page page) {
		Result result = new Result();
		page.setKeyWord("%"+page.getKeyWord()+"%");
		page = pageUtil.getPage(page, memberMapper);
		if(page.getData()!=null&& page.getData().size()>0){
			result.setStatus(0);
			result.setData(page);
		}else{
			result.setStatus(1);
			result.setMessage("未查询到用户信息");
		}
		return result;
	}

	@Override
	public Result findMemberByName(String memberName) {
		Result result = new Result();
		String id = this.memberMapper.findMemberByName(memberName);
		if(id!=null){
			result.setStatus(0);
		}else{
			result.setStatus(1);
		}
		return result;
	}

	@Override
	public Result addMember(Member member) {
		Result result = new Result();
		member.setId(UUIDUtil.getUUID());
		int rowAffect= this.memberMapper.addMember(member);
		if(rowAffect==1){
			result.setStatus(0);
			result.setMessage("添加成功");
		}else{
			result.setStatus(1);
			result.setMessage("添加失败");
		}
		return result;
	}
	//删除工作室成员
	@Override
	public Result deleteMemberBymemberId(String memberId) {
		Result result = new Result();
		int rowAffect = this.memberMapper.deleteMeberById(memberId);
		if(rowAffect==1){
			result.setStatus(0);
			result.setMessage("删除成功");
		}else{
			result.setStatus(1);
			result.setMessage("删除失败");
		}
		return result;
	}

	@Override
	public Result findMemberById(String memberId) {
		Result result = new Result();
		Member member = this.memberMapper.findMemberById(memberId);
		if(member!=null){
			result.setStatus(0);
			result.setData(member);
		}else{
			result.setData(1);
			result.setMessage("用户不存在");
		}
		
		return result;
	}

	@Override
	public Result updateMember(Member member) {
		Result result = new Result();
		int rowAffect=this.memberMapper.updateMember(member);
		if(rowAffect==1){
			result.setStatus(0);
			result.setMessage("修改成功");
		}else{
			result.setStatus(1);
			result.setMessage("修改失败");
		}
		return result;
	}

}
