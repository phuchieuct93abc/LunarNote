import update from 'immutability-helper';
import { updateImmutable } from '../../logics'
const sampleTable = [
  [6, 7, 0, 4, 0, 0, 0, 0, 0],
  [0, 0, 1, 8, 9, 7, 0, 0, 6],
  [0, 0, 0, 0, 6, 0, 0, 0, 0],
  [1, 0, 0, 3, 2, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 8, 0, 2, 0],
  [0, 8, 0, 5, 0, 0, 4, 7, 0],
  [7, 0, 0, 0, 8, 5, 9, 0, 2],
  [0, 6, 9, 0, 0, 0, 1, 0, 0],
  [8, 2, 0, 0, 0, 0, 5, 0, 0],
]
const initTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

]
export default function currentSudoku(state = { data: initTable }, { type, data }) {
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
