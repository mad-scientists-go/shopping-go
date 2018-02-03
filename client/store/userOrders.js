import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const gotOrders = (orders) => ({
	type: GOT_ORDERS,
	orders
})

/**
 * THUNK CREATORS
 */
export const getOrders = (userId) =>
  dispatch =>
	axios.get(`/api/orders/${userId}`)
	.then(res => res.data)
	.then(results => {
    console.log('userorders', results)
		dispatch(gotOrders(results || defaultOrders))
	})
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GOT_ORDERS:
			return action.orders
    default:
      return state
  }
}
