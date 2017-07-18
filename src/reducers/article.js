

const fakeData = [...Array(10)].map((_, i) => ({isLoading:true,key:i+"_fake"}));
export const article = (state = [], action) => {
console.log(action.type)
  switch (action.type) {
    case "FETCH_ARTICLE_LIST":
      return [];

    case "RESET_ARTICLE":
      return [];
      break;


    case "NEW_ARTICLE_ARRIVE":
  var newList = state.map(article=>(article.isLoading?action.articleList.shift():article))
    return newList
  // return [...state,...action.articleList]

      case "ADD_FAKE_DATA":
      return [...state,...fakeData]
    //      return state

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
