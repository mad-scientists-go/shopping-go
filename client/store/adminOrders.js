import axios from 'axios'

//Action Types
const GET_ORDERS = 'GET_ORDERS';
const DELETE_ORDER = 'DELETE_ORDER';
const MODIFY_ORDER = 'MODIFY_ORDER';

//Action Creators

const getOrders = (orders) => ({
    type: GET_ORDERS,
    orders
})
const deleteOrder = (orderId) => ({
    type: DELETE_ORDER,
    orderId
})
const modifyOrder = (order) => ({
    type: MODIFY_ORDER,
    order
})

//initialState
const allOrders = [];

//thunks/thunk creators
export const fetchOrders = () => dispatch => {
    axios.get('/api/orders')
    .then(res => {
        dispatch(getOrders(res.data))
    })
}

export const removeOrder = (id) => dispatch => {
    axios.delete(`/api/orders/${id}`)
    .then(res => res.data)
    .then(console.log('buhBAH'))
}

export default function(state = allOrders, action) {
    switch (action.type) {
        case GET_ORDERS:
        return action.orders
        case DELETE_ORDER:
        return action.orders.filter(order => order.id !== action.orderId)
        default: return state
    }
}
