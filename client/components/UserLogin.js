import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../store';
class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.userLogin(email, password)
    }
    render() {
    return (
        <div>
          <h1>Login As User</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="email" />
            <input name="password" value ={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="password" />
            <button type="submit">Log In</button>
          </form>
        </div>
      )
    }
}
const mapDispatch = (dispatch) => ({
    userLogin(email, password) {
        dispatch(loginUser(email, password))
    }
})
export default connect(null, mapDispatch)(UserLogin)
