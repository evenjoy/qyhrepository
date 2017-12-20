package com.monkey.vo;

import java.util.List;
import com.monkey.util.PageUtil;

public class Page {
	private int currentPage;//当前页
	private int pageSize;	//每页条数
	private int previousPage;	//上一页
	private int nextPage;		//下一页
	private int totalCount;		//总记录数
	private int totalPage;		//总页数
	private int begin;			//数据起始点
	private String type;		//分类信息
	private List<Integer> aNum;	//页码条
	private String keyWord;		//模糊关键字
	private List data;			//数据
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPreviousPage() {
		return previousPage;
	}
	public void setPreviousPage(int previousPage) {
		this.previousPage = previousPage;
	}
	public int getNextPage() {
		return nextPage;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getBegin() {
		return begin;
	}
	public void setBegin(int begin) {
		this.begin = begin;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<Integer> getaNum() {
		return aNum;
	}
	public void setaNum(List<Integer> aNum) {
		this.aNum = aNum;
	}
	public String getKeyWord() {
		return keyWord;
	}
	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}
	public List getData() {
		return data;
	}
	public void setData(List data) {
		this.data = data;
	}
}
