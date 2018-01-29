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
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const kairosWalkIn = () =>
    dispatch =>
        axios.get('/auth/me')
            .then(res =>
            dispatch(getUser(res.data || defaultUser)))
            .catch(err => console.log(err))

export const kairosWalkOut = () =>
dispatch =>
    axios.get('/auth/me')
        .then(res =>
        dispatch(getUser(res.data || defaultUser)))
        .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
