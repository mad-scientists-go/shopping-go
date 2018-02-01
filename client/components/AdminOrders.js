import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchOrders} from '../store';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export class AdminOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
        expanded: false
    };
  }

  componentDidMount() {
    this.props.getOrders()
  }
 handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };
  render() {
    console.log('gthis is rendering', this.props.orders)
    
    return (
      <div>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);