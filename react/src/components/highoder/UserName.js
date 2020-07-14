import React,{Component} from 'react'
// import local from './local.js'
import ajax from './ajax.js'
class UserName extends Component {
    // componentDidMount () {
    //     this.username.value = localStorage.getItem('username') || '请输入昵称！'
    // }
    // handleChange = (event) => {
    //     localStorage.setItem('username',event.target.value)
    // }
    render () {
        return <label>用户名<input defaultValue={this.props.data} onChange={this.props.save}/></label>
    }
};
export default ajax(UserName,'username','用户名！')
// 希望这个值，先从local取，再去接口里面取
// a => b => c;
