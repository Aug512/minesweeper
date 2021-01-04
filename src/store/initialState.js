const initialState = {
  gameOver: false,
  difficulty: '',
  tiles: [],
  mines: 0,
  message: 'Select difficulty:',
      // easy - 9x9 + 10 mines
      // medium - 16x16 + 40 mines
      // hard - 80x60 + 99 mines
}

export default initialState;
