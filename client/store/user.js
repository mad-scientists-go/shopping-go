import axios from "axios"
import history from "../history"

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER"
const REMOVE_USER = "REMOVE_USER"

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const authMe = () => dispatch =>
  axios
    .get("/auth/me")
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const authUser = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data));
        history.push("/home");
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

    export const loginUser = (email, password) => dispatch => {
      console.log('login email', email)
      axios.post('/auth/login', {email, password})
      .then(res => {
        dispatch(getUser(res.data || null))
        history.push('/home');
      })
    }
// export const faceAuth = subject_id => dispatch => {
//   //  var utterance = new SpeechSynthesisUtterance('Recognizing, please wait');
//   // window.speechSynthesis.speak(utterance);
//   return axios
//     .post(`/auth/face-auth`, { subject_id })
//     .then(
//       res => {
//         if (res.data) {
//           dispatch(getUser(res.data));
//           var utterance = new SpeechSynthesisUtterance(
//             "Hello " + res.data.first + " , welcome to the store"
//           );
//           window.speechSynthesis.speak(utterance);
//           history.push("/home");
//         }
//       },
//       authError => {
//         // rare example: a good use case for parallel (non-catch) error handler
//         dispatch(getUser({ error: authError }));
//       }
//     )
//     .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
// };
export const signupWithImage = (
  email,
  password,
  subject_id,
  card_num,
  first,
  last
) => dispatch =>
  axios
    .post(`/auth/signup-image`, {
      email,
      password,
      subject_id,
      card_num,
      first,
      last
    })
    .then(res => {
      dispatch(getUser(res.data))
      history.push("/home")
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logoutUser = () => dispatch => {
  // var utterance = new SpeechSynthesisUtterance(
  //   "Goodbye " + name + " , thank you for shopping!"
  // );
  // window.speechSynthesis.speak(utterance)
  return axios
    .post("/auth/logout")
    .then(_ => {
      dispatch(removeUser())

      history.push("/login")
    })
    .catch(err => console.log(err));
};
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
