export const values = (state = {currentIndex:0}, action) => {
  switch (action.type) {
  	case "NEW_ARTICLE_ARRIVE":
  	return {...state,currentIndex:state.currentIndex+10}
  	case "RESET_ARTICLE":
  	return {...state,currentIndex:0}
  	case "SELECTED_ARTICLE_INDEX":
  	return {...state,selectedArticleIndex:action.index}
    case "OPEN_BOTTOM_SHEET":
    return {...state,isOpenBottomSheet:action.isOpen}
    case "CHANGE_BOTTOM_SHEET":{
      console.log("open")
      return {...state,isOpenBottomSheet:!state.isOpenBottomSheet}

    }
    case "CHANGE_NIGHT_MODE":
    return {...state,nightMode:!state.nightMode}
    default: return state;
  }
};
