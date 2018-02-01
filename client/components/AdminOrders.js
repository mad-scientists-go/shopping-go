import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchOrders} from '../store';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

export class AdminOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    this.props.getOrders()
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    console.log('gthis is rendering', this.props.orders)
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
     
      {
        this.props.orders && this.props.orders.map(order => {
          return (
            <div>
            <RaisedButton label="Dialog With Date Picker" onClick={this.handleOpen} />
            <Dialog
              title="Dialog With Date Picker"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Open a Date Picker dialog from within a dialog.
              <DatePicker hintText="Date Picker" />
            </Dialog>
          </div>
          )
          
        
        })
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    orders: state.adminOrders
})

const mapDispatchToProps = dispatch => ({
    getOrders() {
      dispatch(fetchOrders())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
