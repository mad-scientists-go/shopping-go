import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, user} = props

  return (
    <div >
      <nav>
        {
           <div style={{display: 'flex', justifyContent: 'space-around', top: '20px'}}>
              <Link className="linkItem" to="/shelfcamera">Shelf Camera</Link>
              <Link className="linkItem" to="/login">Login</Link>
              <Link className="linkItem" to="/signup">Sign Up</Link>
              <Link className="linkItem" to="/admin">Admin</Link>
              {/* <EnterExit /> */}
            </div>
        }
      </nav>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.adminUser
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (name) {
      dispatch(logout(name))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
}
