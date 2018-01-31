import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AdminOrders extends Component {

  render() {
    console.log('gthis is rendering')
    return (
      <div>
        Admin Orders
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
