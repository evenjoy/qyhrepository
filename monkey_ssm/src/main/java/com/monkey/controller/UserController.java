package com.monkey.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.monkey.entity.Member;
import com.monkey.entity.User;
import com.monkey.service.IUserService;
import com.monkey.util.FileUploadUtil;
import com.monkey.vo.Page;
import com.monkey.vo.Result;

@Controller
@RequestMapping("/user")
public class UserController {
	@Resource(name="userService")
	private IUserService userService;
	@Resource(name="fileUploadUtil")
	private FileUploadUtil fileUploadUtil;
	//查询用户名是否存在
	@RequestMapping(value="/finduserName",method=RequestMethod.GET)
	@ResponseBody
	public Result findUserByName(@RequestParam("userName") String userName){
		return this.userService.finduserName(userName);
	}
	//注册
	@RequestMapping(value="/newUser",method=RequestMethod.POST)
	@ResponseBody
	public Result addUser(User user){
		return this.userService.addUser(user);
	}
	//登录
	@RequestMapping(value="/login",method=RequestMethod.GET)
	@ResponseBody
	public Result login(@RequestParam("userloginName") String loginName,@RequestParam("userPassword") String password,@RequestParam("logintype") String logintype,HttpServletRequest request){
		Result result = null;
		result=this.userService.login(loginName,password,logintype);
		HttpSession session = request.getSession();
		session.removeAttribute("User");
		session.removeAttribute("Member");
		if(result.getData() instanceof User){
			session.setAttribute("User", result.getData());
		}else if(result.getData() instanceof Member){
			session.setAttribute("Member", result.getData());
		}
		return  result;
	}
	//加载用户信息
	@RequestMapping(value="/userMessage/{type}",method=RequestMethod.GET)
	@ResponseBody
	public Result userMessage(@PathVariable("type") String type,HttpServletRequest request){
		Result result = new Result();
		HttpSession session=null;
		session = request.getSession();
		if("delete".equals(type)){
			session.removeAttribute("User");
			session.removeAttribute("Member");
		}else{
			if(session.getAttribute("User")!=null){
				result.setData(0);
				result.setData(session.getAttribute("User"));
				return result;
			}else if(session.getAttribute("Member")!=null){
				result.setStatus(1);
				result.setData(session.getAttribute("Member"));
				return result;
			}
		}
		return result;			
	}
	//分页查询用户信息
	@RequestMapping(value="/userPage",method=RequestMethod.GET)
	@ResponseBody
	public Result userMessage(Page page){
		page.setKeyWord("%"+page.getKeyWord()+"%");
		return this.userService.findAllUserByPage(page);			
	}
	//分页查询用户信息
	@RequestMapping(value="/deleteUser/{id}",method=RequestMethod.DELETE)
	@ResponseBody
	public Result deleteUser(@PathVariable("id") String id){
		return this.userService.deleteUserById(id);		
	}	
	//上传
	@RequestMapping(value="/test",method=RequestMethod.POST)
	@ResponseBody
	public void test(HttpServletRequest request,HttpServletResponse response,MultipartFile file){
		System.out.println(request.getContentType());
		System.out.println(file.getOriginalFilename());
		this.fileUploadUtil.upload(request, response);
	}		
}
