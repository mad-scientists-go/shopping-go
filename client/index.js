import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// establishes socket connection
import './socket'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
  <Provider store={store}>
  <Routes />
  </Provider>
  </MuiThemeProvider>,
  
  document.getElementById('app')
)
