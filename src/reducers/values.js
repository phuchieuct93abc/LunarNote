export const values = (state = {currentIndex:0}, action) => {
  switch (action.type) {
    case "FETCHING_DATA":
    return {...state,isFetchingData:true}
  	case "NEW_ARTICLE_ARRIVE":
  	return {...state,currentIndex:state.currentIndex+10,isFetchingData:false}
  	case "RESET_ARTICLE":
  	return {...state,currentIndex:0,selectedArticleIndex:0}
  	case "SELECTED_ARTICLE_INDEX":
  	return {...state,selectedArticleIndex:action.index}
    case "OPEN_BOTTOM_SHEET":
    return {...state,isOpenBottomSheet:action.isOpen}
    case "CHANGE_BOTTOM_SHEET":
      return {...state,isOpenBottomSheet:!state.isOpenBottomSheet}
    case "CHANGE_NIGHT_MODE":
    return {...state,nightMode:!state.nightMode}
    case "CHANGE_FONT_SIZE":
    return {...state,fontSize:action.fontSize}
    case "Navigation/BACK":
    case "GO_BACK":
    return {...state,allowToScrollToItem:true}
    case "DISABLE_SCROLL":
    return {...state,allowToScrollToItem:false}
    default: return state;
  }
};
