import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Card,
  CardHeader,
  CardText
} from "material-ui/Table";

class AdminSeeUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('/api/users')
    .then(res => res.data)
    .then(data => this.setState({ users: data}))
    .catch(err => console.log(err))
  }
  render() {
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
              this.state.users && this.state.users.map(user => {
                  return (
                  <TableRow key={user.id}>
                    <TableRowColumn>
                    <Card expanded={true}>
                    <CardHeader
                      title={"Order " + user.id + ' - ' + user.first + ' ' + user.last}
                      subtitle={"Status: " + user.isAdmin}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                    <span>card text</span>
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
    );
  }
}

export default AdminSeeUsers;
