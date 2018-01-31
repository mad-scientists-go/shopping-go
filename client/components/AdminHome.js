import React, {Component } from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import AdminInStore from './AdminInStore';
import AdminSeeUsers from './AdminSeeUsers';
import AdminOrders from './AdminOrders';
import AdminNav from './AdminNav';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {open: false};
    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});
    render() {
        return (
            <div>
            <AdminNav />
                <Router history={history}>

                    <Switch>

                        <Route path="/adminorders" component={AdminOrders} />
                        <Route path="/adminusers" component={AdminSeeUsers} />
                        <Route path="/adminstore" component={AdminInStore} />
                    </Switch>
                </Router>
            </div>
           
        )
    }
}
export default connect(null,null)(AdminHome)