import React, { Component } from 'react'
export default class Login extends Component {
    constructor() {
        super();
        this.state = {users:[]}
    }
    handleClick = () => {
        localStorage.setItem('login',true);
        this.props.history.push(this.props.location.state.from);
    }
    render() {
        return (
            <div className="list-group">
                <button onClick={this.handleClick} className="btn btn-primary">登录</button>
            </div>
        )
    }
}
