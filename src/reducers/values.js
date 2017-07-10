export const values = (state = {currentIndex:0}, action) => {

  switch (action.type) {
  	case "NEW_ARTICLE_ARRIVE":
  	return {...state,currentIndex:state.currentIndex+10}
  	case "RESET_ARTICLE":
  	return {...state,currentIndex:0}
  
    default: return state; 
  }
};
