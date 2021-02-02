import OPEN_SETTINGS from '../Actions/OPEN_SETTINGS'
import CLOSE_SETTINGS from '../Actions/CLOSE_SETTINGS'

const setSettingsPanelView = state => {
  // switch (state) {
  //   case 'open':
  //     return {
  //       type: OPEN_SETTINGS,
  //     }

  //   case 'close':
  //     return {
  //       type: CLOSE_SETTINGS,
  //     }
  // }
  if (state) return {type: OPEN_SETTINGS}
  else return {type: CLOSE_SETTINGS}
}

export default setSettingsPanelView
