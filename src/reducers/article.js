const getFakeDate = [...Array(10)].map((_, i) => i * 10);
export const article = (state = [], action) => {

  switch (action.type) {
    case "FETCH_ARTICLE_LIST":
      return [];

    case "RESET_ARTICLE":
      return [];
      break;

      
    case "NEW_ARTICLE_ARRIVE":

      return [
        ...state,...action.articleList 
      ]
      case "ADD_FAKE_DATE":
          return [
        ...state,...getFakeDate
      ]

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
  
