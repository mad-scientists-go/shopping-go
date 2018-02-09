import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchUsers} from '../store'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
export class AdminSeeUsers extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    console.log(this.props.users)
    return (
      <div style={{display: 'flex',  justifyContent: 'flex-end', marginRight: '25px'}}>
      <Table style={{width: '70vw'}}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn colSpan="3" tooltip="Users" style={{textAlign: 'center', fontSize: '20px'}}>
          User Orders
        </TableHeaderColumn>
      </TableRow>

    </TableHeader>
  
      <TableBody adjustForCheckbox={false} displayRowCheckbox={false}>
      { this.props.users.length > 0  && this.props.users.map(user => {
        console.log(user)
       return(
       <TableRow>
       <TableRowColumn className="orderDiv">
       <Card>
       <CardHeader
         title={user.first + ' ' + user.last}
         subtitle={user.email}
         actAsExpander={true}
         showExpandableButton={true}
       />
       <CardText expandable={true}>
        <h4>Subject Id: {user.subject_id}</h4>
        <h4>User Since: {user.createdAt.split('T')[0]}</h4>
       </CardText>
     </Card>
       </TableRowColumn>
   
     </TableRow>
        )
      })}
      </TableBody>
      </Table>
      
      
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    users: state.allUsers
})

const mapDispatchToProps = dispatch => ({
    getUsers() {
      dispatch(fetchUsers())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeeUsers)
