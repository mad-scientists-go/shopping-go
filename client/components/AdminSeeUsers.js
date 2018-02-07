import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AdminSeeUsers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
          <h1>This is the admin users view</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeeUsers)
