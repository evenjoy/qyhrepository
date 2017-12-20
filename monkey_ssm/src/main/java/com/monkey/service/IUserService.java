package com.monkey.service;

import com.monkey.entity.User;
import com.monkey.vo.Page;
import com.monkey.vo.Result;

public interface IUserService {
	
	public Result finduserName(String userloginName);
	
	public Result addUser(User user);
	
	public Result login(String loginName,String password,String logintype);
	//分页查询用户信息
	public Result findAllUserByPage(Page page);
	//删除用户
	public Result deleteUserById(String id);
}
