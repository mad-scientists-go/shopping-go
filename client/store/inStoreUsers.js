import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_INSTORE_USER = 'GOT_INSTORE_USER'
const REMOVE_INSTORE_USER = 'REMOVE_INSTORE_USER'

/**
 * INITIAL STATE
 */
const defaultInStoreUsers = []

/**
 * ACTION CREATORS
 */
const gotInStoreUser = user => ({ type: GOT_INSTORE_USER, user })
const removedInStoreUser = () => ({ type: REMOVE_INSTORE_USER })

/**
 * THUNK CREATORS
 */
export const faceAuthWalkIn = (subject_id) =>
dispatch => {
  // var utterance = new SpeechSynthesisUtterance('Recognizing, please wait');
  // window.speechSynthesis.speak(utterance);
  axios.post(`/auth/face-auth`, { subject_id })
    .then(res => {
      if (res.data){
        dispatch(gotInStoreUser(res.data))
        var utterance = new SpeechSynthesisUtterance('Hello ' + res.data.first  + ' , welcome to the store');
        window.speechSynthesis.speak(utterance);
        history.push('/home')
      }
    }, authError => { // rare example: a good use case for parallel (non-catch) error handler
      dispatch(gotInStoreUser({error: authError}))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))


  }

export const kairosWalkOut = () =>
dispatch =>
    axios.get('/auth/me')
        .then(res =>
        dispatch(removedInStoreUser(res.data || defaultUser)))
        .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultInStoreUsers, action) {
  switch (action.type) {
    case GOT_INSTORE_USER:
      return state.filter(user => user.id === action.user.id).length === 0 ?
        [...state, action.user] : state
    case REMOVE_INSTORE_USER:
      return defaultUser
    default:
      return state
  }
}
