import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
<<<<<<< HEAD
  let flag = true;
  console.log('props',props)
  if(flag){
    var utterance = new SpeechSynthesisUtterance('Hello ' + email  + ' , welcome to the store');
    window.speechSynthesis.speak(utterance);
    flag = false;
  }
=======
>>>>>>> 776c0eb1272864fcb376ca569c5ebdd1f9253580
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
