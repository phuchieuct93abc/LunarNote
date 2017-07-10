const URL =
	"http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start=${start}&count=10&listType=zone&listId=53&imageMinSize=300&mode=quickview";
getArticleList = (url,start)=>{

	return fetch(URL.replace("${start}",start)).then(success => success.json(), error => {})

}

export const fetchArticleList = id => {
	let start = 0;
	return dispatch => {
		dispatch({type:"FETCHING_DATA"});
		dispatch(resetArticle());

		return getArticleList(URL,start).then(json => {

				dispatch(receiveNewArticleList(json.articlelist)); 
			});
	};
};

export const loadMore = () => {
	return (dispatch,state) => {
		dispatch({type:"FETCHING_DATA"});
		dispatch(addFakeDate());
		return getArticleList(URL,state().values.currentIndex).then(json => {
				dispatch(receiveNewArticleList(json.articlelist)); 
			});
	};
};

export const selectCategory = id => {
	return {
		type: "SELECT_CATEGORY",
		id
	};
};

export const receiveNewArticleList = articleList => {
	return {
		type: "NEW_ARTICLE_ARRIVE",
		articleList
	};
};
export const resetArticle = ()=>{

	return {
		type: "RESET_ARTICLE"
	};
}
export const addFakeDate = ()=>{
	return {type:"ADD_FAKE_DATE"}

}