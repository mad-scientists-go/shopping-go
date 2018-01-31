import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AdminInStore extends Component {

  render() {
    return (
      <div>
        <h1>Admin View For In Store Users</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInStore)
