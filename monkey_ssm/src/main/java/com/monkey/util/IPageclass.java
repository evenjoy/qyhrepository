package com.monkey.util;

import java.util.List;

import com.monkey.vo.Page;

/**
 * 该接口是分页处理的模板接口
 * @author admin
 * @param <T>
 * @param <T>
 *
 */
public interface IPageclass<T> {
	//获取总记录数
	public int getCount(Page page);
	//获取数据
	public List<T> getPageData(Page page);
	
}
