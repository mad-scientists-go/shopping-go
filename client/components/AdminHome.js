import React, {Component } from "react";
import {connect} from 'react-redux';

class AdminHome extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <h1>Admin Home</h1>
        )
    }
}
export default connect(null,null)(AdminHome);