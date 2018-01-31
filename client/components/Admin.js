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
    componentDidMount() {
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
                    this.props.admin ? <AdminHome /> : <AdminLogin /> 
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        adminUser: state.adminUser
    }
}
const mapDispatch = (dispatch) => {
    return {
        getMe() {
            dispatch(me())
        },
        loginAdminPerson(admin) {
            dispatch(login(admin))
        }
    }
}
export default connect(mapState, mapDispatch)(Admin)