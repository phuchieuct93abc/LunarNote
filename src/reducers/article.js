getRandomKey = ()=>{  return '_' + Math.random().toString(36).substr(2, 9);
}

const getFakeDate = [...Array(10)].map((_, i) => ({isLoading:true,key:getRandomKey()}));
console.log(getFakeDate)
export const article = (state = [], action) => {

  switch (action.type) {
    case "FETCH_ARTICLE_LIST":
      return [];

    case "RESET_ARTICLE":
      return [];
      break;

      
    case "NEW_ARTICLE_ARRIVE":
   // var newList =state.map(article=>(article.isLoading?action.articleList.shift():action.articleList.shift()))
   // return Array.from(new Set(newList))
   return [...state,...action.articleList]
    
      case "ADD_FAKE_DATA":
     // return [...state,...getFakeDate()]
          return state

    default: return state;
  }
};
export const category = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {...state,id:action.id};

  
    default: return state;
  }
};
  
