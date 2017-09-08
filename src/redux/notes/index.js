import update from 'immutability-helper';
import { updateImmutable } from '../../logics'

export default function currentSudoku(state = {}, { type, data }) {
  switch (type) {
    case 'UPDATE_SUDOKU': {
      var { rowIndex, columnIndex, value } = data
      const newObj = updateImmutable(state.data, rowIndex, columnIndex, value);

      return {
        ...state,
        data: newObj
      };
    }
    case 'SET_SUDOKU': {
      const newObj = update(state.data, { $set: data });
      console.log(newObj)
      return {
        ...state,
        data: newObj
      };

    }
    case 'RESET_SUDOKU': {
      return {
        ...state,
        data: initTable
      };
    }
    case 'NEW_SUDOKU': {
      return {
        ...state,
        data: sampleTable
      };
    }


    default:
      return state;
  }
}
