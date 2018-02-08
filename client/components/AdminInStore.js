import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {retrieveAllInStore} from '../store'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import io from "socket.io-client";
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
};
//https://smart-mart-server.herokuapp.com/ - connect to this
const socket = io('http://localhost:8080');
export class AdminInStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
        usersInStore: []
    }
    this.updateUserInfo = this.updateUserInfo.bind(this)
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  updateUserInfo(data) {
    console.log(data.data.userId)
    const fakeState = this.state.usersInStore.slice()
    fakeState.map(user => {
    
      if(user.id === data.data.userId) {
        user.orderInfo = data.data.lineItems
      }
    })
    this.setState({usersInStore: fakeState})
    console.log(this.state, 'new state after cart update')
  }
  render() {
    socket.on("mobile-cart-update", data => {
      console.log("smobile socket working");
      this.updateUserInfo(data)
    });
    socket.on("new-instore-user", data => {
      console.log('hey, someone walked in!!')
      console.log(data)
      if(this.state.usersInStore.filter(user => user.id === data.user.id).length === 0) {
        data.user.orderInfo = []
        this.setState({usersInStore: this.state.usersInStore.concat([data.user])})
      } else {
        console.log('user already in store')
      }
    })
    socket.on("walkout-instore-user", data => {
      console.log('walkout user', data.user.id)
      this.setState({usersInStore: this.state.usersInStore.filter(user => user.id !== data.user.id)})
    })
    console.log(this.state.usersInStore, 'in store yo')
    return (
      <div style={{display: 'flex',  justifyContent: 'center'}}>
      <Table style={{width: '70vw'}}>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Order ID</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
          <TableHeaderColumn>User</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          this.state.usersInStore && this.state.usersInStore.map(userOrderData => {
            console.log(userOrderData)
            return(
              <TableRow key={userOrderData.id}>
              <TableRowColumn>
              <Card >
              <CardHeader
                title= {userOrderData.first + ' ' + userOrderData.last}
                subtitle={userOrderData.email}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                  <ul>
                    <h3>Hi</h3>
                    {
                      userOrderData.orderInfo.map(order => {
                        return (
                          <li key={order.id}>{
                            `user has ${order.qty} ${order.product.name}(s) in the cart` 
                          }</li>
                        )
                      })
                    }
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

const mapStateToProps = (state) => ({
  users: state.users,
  orders: state.orders,
  inStoreUsers: state.inStoreUsers
})



const mapDispatchToProps = (dispatch) => ({
    getAllUsers() {
      dispatch(retrieveAllInStore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminInStore)
