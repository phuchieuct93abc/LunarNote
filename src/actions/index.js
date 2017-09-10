import { getFirebase } from 'react-redux-firebase';

export const addTodo = (newTodo,uid) => {
  if(uid){
    getFirebase().push(`/notes/${uid}`, newTodo).then(() => {
      dispatch({ type: "FINISHED" })
    })
  }

};