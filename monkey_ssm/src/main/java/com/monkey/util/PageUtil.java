package com.monkey.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.monkey.vo.Page;


@Component("pageUtil")
public class PageUtil {
	@Value("#{manyProperties['pageSize']}")
	private int pageSize;
	@Value("#{manyProperties['showNum_a']}")
	private int showNum_a;
	public int getPageSize() {
		return pageSize;
	}
	public int getShowNum_a() {
		return showNum_a;
	}

	/**
	 * 此方法是计算页面分页条中有多少个超链接
	 * @param currentPage
	 * @param pageSize
	 * @param totalCount
	 * @param totalPage
	 * @return
	 */
	public List<Integer> getFenYe_a_Num(
			int currentPage,
			int pageSize,
			int totalCount,
			int totalPage){
		List<Integer> aNum=new ArrayList<Integer>();
		//int showNum_a=CommonValue.showNum_a;
		if(totalCount/pageSize>=showNum_a){
			//总页数大于等于showNum_a   5
			if(currentPage<showNum_a/2+1){
				//当前页在showNum_a的中间左边
				for(int i=1;i<=showNum_a;i++){
					aNum.add(new Integer(i));
				}
			}else if((totalPage-currentPage)<(showNum_a/2+1)){
				//判断如果是到最后,最后的那几个数字不能移动的
				for(int i=1;i<=showNum_a;i++){
					aNum.add(new Integer(totalPage-showNum_a+i));
				}
			}else{
				//不是头,也不是尾,是中间部分
				for(int i=(currentPage-(showNum_a-(showNum_a/2+1)));i<=(currentPage+(showNum_a-(showNum_a/2+1)));i++){
					aNum.add(new Integer(i));
				}
			}
		}else{
			//总页数不够showNum_a  5
			for(int i=1;i<=totalPage;i++){
				aNum.add(new Integer(i));
			}
		}
		
		return aNum;
	}
	public <T> Page getPage(Page page,IPageclass<T> pc){
		int currentPage = page.getCurrentPage();
		page.setPageSize(pageSize);
		page.setKeyWord(page.getKeyWord());
		page.setType(page.getType());
		int totalCount=pc.getCount(page);
		page.setTotalCount(totalCount);
		int totalPage=totalCount%this.pageSize==0?totalCount/this.pageSize:(totalCount/this.pageSize)+1;
		page.setTotalPage(totalPage);;
		//上一页
		if(currentPage==1){
			page.setPreviousPage(1);
		}else{
			page.setPreviousPage(currentPage-1);
		}
		//下一页
		if(currentPage==totalPage){
			page.setNextPage(totalPage);
		}else{
			page.setNextPage(currentPage+1);
		}
		page.setBegin((currentPage-1)*this.pageSize);
		page.setData(pc.getPageData(page));
		page.setaNum(this.getFenYe_a_Num(currentPage, this.pageSize, totalCount, totalPage));
		return page;
	}
}
