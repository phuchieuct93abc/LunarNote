export const addTodo = (newTodo) =>
  (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  
 
  
    
    firebase.push('/todos', newTodo).set({
    owner:"phuchieu",...newTodo
  }).then(() => {
      dispatch({type:"FINISHED"})
      })
  };