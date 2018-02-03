import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import CamSignup from './CamSignUp'
import UserLogin from './UserLogin'
import ShelfCamera from './ShelfCamera'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName} = props
  let view = props.name === 'login' ? <UserLogin /> : <CamSignup />
  return (
    <div>
      {
        view
      }
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login'
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up'
  }
}

export const Login = connect(mapLogin)(AuthForm)
export const Signup = connect(mapSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
}
