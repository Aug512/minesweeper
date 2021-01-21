import SET_DIFFICULTY_EASY from '../Actions/SET_DIFFICULTY_EASY'
import SET_DIFFICULTY_MEDIUM from '../Actions/SET_DIFFICULTY_MEDIUM'
import SET_DIFFICULTY_HARD from '../Actions/SET_DIFFICULTY_HARD'

const setDifficulty = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return {
        type: SET_DIFFICULTY_EASY,
      };
    case 'medium':
      return {
        type: SET_DIFFICULTY_MEDIUM,
      }
    case 'hard':
      return {
        type: SET_DIFFICULTY_HARD,
      }
    default:
      return {} 
  }
}

export default setDifficulty
