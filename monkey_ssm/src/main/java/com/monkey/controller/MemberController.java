package com.monkey.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.monkey.entity.Member;
import com.monkey.service.IMemberService;
import com.monkey.vo.Page;
import com.monkey.vo.Result;

@Controller
@RequestMapping("/member")
public class MemberController {
	@Resource(name="memberService")
	private IMemberService memberService;
	//分页查询
	@RequestMapping(value="/MemberPage",method=RequestMethod.GET)
	@ResponseBody
	public Result findAllMemberByPage(Page page){
		return this.memberService.findAllMemberByPage(page);
	}
	//查询工作室成员是否存在
	@RequestMapping(value="/findmemberName",method=RequestMethod.GET)
	@ResponseBody
	public Result findmemberName(@RequestParam("memberloginName") String memberName){
		return this.memberService.findMemberByName(memberName);
	}	
	//新增工作室成员
	@RequestMapping(value="/newmember",method=RequestMethod.POST)
	@ResponseBody
	public Result addMember(Member member){
		return this.memberService.addMember(member);
	}
	//删除工作室成员
	@RequestMapping(value="/deletemember/{memberId}",method=RequestMethod.DELETE)
	@ResponseBody
	public Result deleteMember(@PathVariable("memberId") String memberId){
		return this.memberService.deleteMemberBymemberId(memberId);
	}	
	//查询工作室成员
	@RequestMapping(value="/member/{memberId}",method=RequestMethod.GET)
	@ResponseBody
	public Result findMemberById(@PathVariable("memberId") String memberId){
		return this.memberService.findMemberById(memberId);
	}		
	//新增工作室成员
	@RequestMapping(value="/updatemember",method=RequestMethod.POST)
	@ResponseBody
	public Result updatemember(Member member){
		return this.memberService.updateMember(member);
	}	
	
}
