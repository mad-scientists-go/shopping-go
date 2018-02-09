import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AdminInStore from './AdminInStore';
import AdminSeeUsers from './AdminSeeUsers';
import AdminOrders from './AdminOrders';
import {Link} from 'react-router-dom';
export default class AdminNav extends Component {
    constructor(props) {
        super(props)
    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});
  render() {
      return (
    <div>
  <Drawer docked={true}  open={true} containerStyle={{ position: 'fixed'}}>
  <img style={{display: 'flex', justifyContent: 'center'}} src={"https://image.ibb.co/i2bYrH/smartmartcart.png"} />
  <Link to="/admin/adminorders"><MenuItem onClick={this.handleClose}>Order History</MenuItem></Link>
  <Link to="/admin/adminusers"><MenuItem onClick={this.handleClose}>All Users</MenuItem></Link>
  <Link to="/admin/admininstore"><MenuItem onClick={this.handleClose}>Manage Store</MenuItem></Link>
</Drawer>
    </div>
  )
}
}

