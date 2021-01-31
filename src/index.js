import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App/App'
// import './styles.css'
import './css/styles.css'
import store from './store/store'

let themeState = store.getState().lightTheme

store.subscribe( () => {
  themeState = store.getState().lightTheme
  themeState ? document.body.className = '' : document.body.className = 'dark'
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
