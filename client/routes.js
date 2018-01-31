import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome} from './components'
import {me} from './store'
import Admin from './components/Admin';
/**
 * COMPONENT
 */
const Routes = (props) => {
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {/* Displays our Login component as a fallback */}
            <Route path="/admin" component={Admin} />
          </Switch>
        </Main>
      </Router>
    )
}
export default Routes