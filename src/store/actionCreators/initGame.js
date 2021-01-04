import GAME_INIT_EASY from "../actions/Game/initGameEasy";
import GAME_INIT_MEDIUM from "../actions/Game/initGameMedium";
import GAME_INIT_HARD from "../actions/Game/initGameHard";

const initGame = (difficulty) => {
  switch(difficulty) {
    case 'easy':
      return {type : GAME_INIT_EASY};
    case 'medium':
      return {type : GAME_INIT_MEDIUM};
    case 'hard':
      return {type : GAME_INIT_HARD};
  }
}

export default initGame
