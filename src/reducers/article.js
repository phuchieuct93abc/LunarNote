export const article = (state = [], action) => {
	    console.log("BBBBBBBBBBBBBBBBBBB");  

  switch (action.type) {
    case "FETCH_ARTICLE_LIST":
      return [];

    case "LOAD_MORE":
      return [];
      break;
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
  