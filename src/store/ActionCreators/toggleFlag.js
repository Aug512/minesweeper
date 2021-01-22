import REMOVE_FLAG from "../Actions/REMOVE_FLAG";
import SET_FLAG from "../Actions/SET_FLAG";

const toggleFlag = (id, isFlag) => {
  switch (isFlag) {
    case true:
      return {
        type: REMOVE_FLAG,
        id: id,
      }
    case false:
      return {
        type: SET_FLAG,
        id: id,
      }
  
    default:
      break;
  }
}

export default toggleFlag
