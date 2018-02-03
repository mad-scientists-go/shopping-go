import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { getOrders } from '../store'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
const styles = {
  customWidth: {
    width: 150,
  },
}
class OrderHistory extends React.Component {

	componentWillMount() {
		let userId = this.props.user.id
		this.props.getOrders(userId)
	}

	render() {
		let list = this.props.orders.map(order => <li key={order.id}>ORDER ID: {order.id} STATUS: {order.status} TIME: {order.createdAt}</li>)
    return (
      <div style={{display: 'flex',  justifyContent: 'center'}}>
            <Table style={{width: '70vw'}}>
            <TableHeader>
              <TableRow>
                <h1>Order History</h1>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
              this.props.orders && this.props.orders.map(order => {
                  return (
                  <TableRow key={order.id}>
                    <TableRowColumn>
                    <Card>
                    <CardHeader
                      title={"Order " + order.id }
                      subtitle={"Status: " + order.status}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                    <ul>
                    {
                      order.lineItems.map(item => {
                        return (
                        <div>
                          <li>
                            <div>{item.product.name}</div>
                            <div>{'quantity' + ': ' + item.qty}</div>
                            <div>{'total item price: ' + item.purchasePrice}</div>
                          </li>
                        </div>


                        )
                      })
                    }
                    <h4>Total: {order.lineItems.length > 0 && order.lineItems.map(item => item.purchasePrice * item.qty).reduce((a,b) => a+b)}</h4>
                    <h5>Status: {order.status}</h5>
                    </ul>

                    </CardText>
                  </Card>
                    </TableRowColumn>

                  </TableRow>
                  )
              })
            }

            </TableBody>
          </Table>
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
		getOrders: (userId) => dispatch(getOrders(userId))
	}
}

export default connect(mapState, mapDispatch)(OrderHistory)
