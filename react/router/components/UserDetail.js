import React, { Component } from 'react'
export default class UserDetail extends Component {
    constructor() {
        super()
        this.state = {user:{}}
    }
    componentDidMount() {
        let userStr = localStorage.getItem('users');
        let users = userStr ? JSON.parse(userStr) : [];
        let user = users.find(user => user.id == params.id);
        this.setState({user})
    }
    render() {
        return (
            <div>
                {user.id}:{user.name}
            </div>
        )
    }
}
