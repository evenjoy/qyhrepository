package com.monkey.dao;

import java.util.List;

import com.monkey.entity.User;
import com.monkey.util.IPageclass;
import com.monkey.vo.Page;

public interface UserMapper extends IPageclass<User>{
	//查找用户名是否存在
	public String findUserName(String userloginName);
	//注册用户
	public int addUser(User user);
	//用户登录
	public User login(User user);
	//获取总记录数（继承自Ipageclass接口）
	//获取数据（继承自Ipageclass接口）
	//删除用户
	public int deleteUserById(String id);
	
	
}
