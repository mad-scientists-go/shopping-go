import React, {Component } from "react";
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {open: false};
    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});
    render() {
        return (
            <div>
            <RaisedButton
            label="Toggle Drawer"
            onClick={this.handleToggle}
          />
          <Drawer docked={false} onRequestChange={(open) => this.setState({open})} open={this.state.open}>
            <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onClick={this.handleClose}> Menu Item 2</MenuItem>
          </Drawer>
            </div>
        )
    }
}
export default connect(null,null)(AdminHome)