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
const socket = io("http://localhost:8080");
export class AdminInStore extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    socket.on("mobile-cart-update", function(data) {
      console.log("smobile socket working");
      console.log(data)
    });
  }
  render() {
    console.log(this.props.inStoreUsers, 'in store yo')
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
          this.props.inStoreUsers && this.props.inStoreUsers.map(userOrderData => {
            return(
              <TableRow key={userOrderData.id}>
              <TableRowColumn>
              <Card >
              <CardHeader
                title= {userOrderData.user.first + ' ' + userOrderData.user.last}
                subtitle={userOrderData.user.email}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
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
