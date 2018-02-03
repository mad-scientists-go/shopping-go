import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrders } from '../store'

class OrderHistory extends React.Component {

	componentWillMount() {
		let userId = this.props.user.id
		this.props.fetchOrders(userId)
	}

	render() {
		let list = this.props.orders.map(order => <li key={order.id}>ORDER ID: {order.id} STATUS: {order.status} TIME: {order.createdAt}</li>)
		return (
			<div>
				<h2>My Orders</h2>
				<ul>
					{
						list
					}
				</ul>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		orders: state.userOrders,
		user: state.user
	}
}

const mapDispatch = (dispatch) => {
	return {
		fetchOrders: (userId) => dispatch(fetchOrders(userId))
	}
}

export default connect(mapState, mapDispatch)(OrderHistory)
