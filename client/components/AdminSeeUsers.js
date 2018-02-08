import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchUsers} from '../store'
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
      <div>
      { this.props.users.length > 0  && this.props.users.map(user => {
        console.log(user)
       return(<div key={user.id}>Hello {user.first + user.last}</div>)
      })}
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
