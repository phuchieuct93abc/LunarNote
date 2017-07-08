
export const fetchArticleList = (id)=>{
	return {
		type:"FETCH_ARTICLE_LIST",
		id
	}

}
export const loadMore = ()=>{

	return {
		type:"LOAD_MORE"
	}

}

export const selectCategory = (id)=>{

	return {
		type:"SELECT_CATEGORY",id
	}

}