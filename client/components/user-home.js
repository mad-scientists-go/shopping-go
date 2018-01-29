import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  let flag = true;
  console.log('props',props)
  if(flag){
    var utterance = new SpeechSynthesisUtterance('Hello ' + email  + ' , welcome to the store');
    window.speechSynthesis.speak(utterance);
    flag = false;
  }
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
