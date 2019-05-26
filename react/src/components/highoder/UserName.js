import React,{Component} from 'react'
export default class UserName extends Component {
    componentDidMount () {
        this.username.value = localStorage.getItem('username') || '请输入昵称！'
    }
    handleChange = (event) => {
        localStorage.setItem('username',event.target.value)
    }
    render () {
        return <label>用户名<input ref={input => this.username = input} onChange={this.handleChange}/></label>
    }
}
