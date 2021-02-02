import SET_DESKTOP from '../Actions/SET_DESKTOP'
import SET_MOBILE from '../Actions/SET_MOBILE'

const setDevice = (type) => {
  if (type === 'mobile') return {type: SET_MOBILE}
  if (type === 'desktop') return {type: SET_DESKTOP}
}

export default setDevice
