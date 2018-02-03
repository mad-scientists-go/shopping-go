import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome } from './components'
import ShelfCamera from './components/ShelfCamera'
import {me} from './store'
import Admin from './components/Admin'
import AdminOrders from './components/AdminOrders'
import MotionLogin from './components/MotionLogin'
import OrderHistory from './components/UserOrderHistory'

/**
 * COMPONENT
 */
const Routes = (props) => {
  return (
    <Router history={history}>
      <Main>
          <div>
          <Switch>
            {/* Routes placed here are available to all visitors */}

            <Route path ="/shelfcamera" component={ShelfCamera} />
            <Route path="/doorwaycameras" component={MotionLogin} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {/* Displays our Login component as a fallback */}
            <Route path="/admin" component={Admin} />
            <Route path="/myorders" component={OrderHistory} />
          </Switch>
          </div>
      </Main>
    </Router>
  )
}
export default Routes
