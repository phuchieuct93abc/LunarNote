export const global = (state,  action) => {

  switch (action.type) {

  	case "SELECTED_ARTICLE_INDEX":{
      let index = action.index;
      let articleList = state.article;
      let selectedArticle=articleList[index]
      return {...state}

    }
  	return state

  }
};
