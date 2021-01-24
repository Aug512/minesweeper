import LOSE_GAME from '../Actions/LOSE_GAME'
import WIN_GAME from '../Actions/WIN_GAME'

const endGame = (statement, detonatedId = null) => {
  switch (statement) {
    case 'win':
      return {
        type: WIN_GAME
      }
    
    case 'lose':
      return {
        type: LOSE_GAME,
        detonatedId: detonatedId
      }

    default: break
  }
} 

export default endGame
