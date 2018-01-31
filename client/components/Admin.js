import React, {Component } from "react";
import {connect} from 'react-redux';
import { me, login } from '../store'
import AdminHome from './AdminHome'
import AdminLogin from './AdminLogin'
class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        }
    }

    // componentWillReceiveProps(newProps) {
    //     if(newProps.admin.id) {
    //         this.setState({
    //             isLoggedIn: true
    //         })
    //     }
    // }
    componentWillMount() {
        console.log('mounte...')
        this.props.getMe()
    }

    handleLogin() {

    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                {
                    this.props.admin.id ? <AdminHome /> : <AdminLogin /> 
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        admin: state.adminUser
    }
}
const mapDispatch = (dispatch) => {
    return {
        getMe() {
            dispatch(me())
        },
        loginAdmin(admin) {
            dispatch(login(admin))
        }
    }
}
export default connect(mapState, mapDispatch)(Admin)