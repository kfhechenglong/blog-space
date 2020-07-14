import React, { Component } from 'react'
export default class UserAdd extends Component {
    constructor() {
        super();
        this.state = {users:[]}
    }
    componentWillMount () {
        let userStr = localStorage.getItem('users');
        let users = userStr ? JSON.parse(userStr) : [];
        this.setState({users})
    }
    render() {
        return (
            <ul className="list-group">
                {
                    this.state.users.map(user => (
                        <li key={user.id} className="list-group-item">{user.username}</li>
                    ))
                }
            </ul>
        )
    }
}
