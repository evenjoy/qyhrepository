package com.monkey.service.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.monkey.dao.MemberMapper;
import com.monkey.dao.UserMapper;
import com.monkey.entity.Member;
import com.monkey.entity.User;
import com.monkey.service.IUserService;
import com.monkey.util.PageUtil;
import com.monkey.util.UUIDUtil;
import com.monkey.vo.Page;
import com.monkey.vo.Result;
@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource(name="userMapper")
	private UserMapper userMapper;
	@Resource(name="memberMapper")
	private MemberMapper memberMapper;
	@Resource(name="pageUtil")
	private PageUtil pageUtil;
	//注册校验用户名是否存在
	@Override
	public Result finduserName(String userloginName){
		Result result = new Result();
		String id = userMapper.findUserName(userloginName);
		if(id!=null){
			result.setStatus(0);
			result.setMessage("用户名已存在");
		}else{
			result.setStatus(1);
			result.setMessage("用户名可用");
		}
		return result;
	}
	//用户注册
	@Override
	public Result addUser(User user) {
		Result result = new Result();
		user.setId(UUIDUtil.getUUID());
		int rowAffect = this.userMapper.addUser(user);
		if(rowAffect ==1){
			result.setStatus(0);
			result.setMessage("注册成功，去登录");
		}else{
			result.setStatus(1);
			result.setMessage("注册失败，请重试");
		}
		return result;
	}
	//用户登录
	@Override
	public Result login(String loginName,String password,String logintype) {
		Result result = new Result();
		if("普通用户".equals(logintype)){
			User user = new User();
			user.setUserloginName(loginName);
			user.setUserPassword(password);
			user=this.userMapper.login(user);
			if(user!=null){
				result.setStatus(0);
				result.setData(user);
				result.setMessage("普通用户");
			}else{
				result.setStatus(1);
				result.setMessage("用户名或密码不正确");
			}
		}else if("工作室成员".equals(logintype)){
			Member member = new Member();
			member.setLoginName(loginName);
			member.setLoginPassword(password);
			member= this.memberMapper.login(member);
			if(member!=null){
				result.setStatus(0);
				result.setData(member);
				result.setMessage("工作室成员");
			}else{
				result.setStatus(1);
				result.setMessage("用户名或密码不正确");
			}
		}
		return result;
	}
	//分页查询用户信息
	@Override
	public Result findAllUserByPage(Page page) {
		Result result = new Result();
		page = pageUtil.getPage(page, this.userMapper);
		if(page.getData()!=null&&page.getData().size()>0){
			result.setStatus(0);
			result.setData(page);
		}else{
			result.setStatus(1);
			result.setMessage("未查询到用户信息");
		}
		return result;
	}
	@Override
	public Result deleteUserById(String id) {
		Result result = new Result();
		int rowAffect = this.userMapper.deleteUserById(id);
		if(rowAffect==1){
			result.setData(0);
			result.setMessage("删除成功");
		}else{
			result.setStatus(1);
			result.setMessage("删除失败");
		}
		return result;
	}
}
