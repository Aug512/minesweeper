import SET_QUESTION from '../Actions/SET_QUESTION'
import SET_FLAG from '../Actions/SET_FLAG'
import SET_NOTHING from '../Actions/SET_NOTHING'

const toggleFlag = (id, currentState) => {
  switch (currentState) {
    case 'none':
      return {
        type: SET_FLAG,
        id: id,
      }
    case 'flag':
      return {
        type: SET_QUESTION,
        id: id,
      }
    case 'question':
      return {
        type: SET_NOTHING,
        id: id,
      }
    default:
      break;
  }
}

export default toggleFlag
