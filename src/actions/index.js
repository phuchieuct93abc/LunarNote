export const addTodo = (newTodo) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    firebase
    firebase.push('/todos', newTodo)
      .then(() => {
      dispatch({type:"FINISHED"})
      })
  };