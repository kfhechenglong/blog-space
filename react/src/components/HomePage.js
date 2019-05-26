/*
 * @Author: 绝对零度
 * @Date: 2019-05-26 12:53:30
 * @Last Modified by: 绝对零度
 * @Last Modified time: 2019-05-26 12:53:59
 */
import React ,{Component} from 'react';
import PropTypes from 'prop-types'
class Title extends Component {
    static contextTypes = {
        color: PropTypes.string
    }
    render() {
        console.log(this.context.color);

        return (
            <div>
                <h1 style={{color:this.context.color}}>我是标题</h1>
            </div>
        )
    }
}
class Header extends Component {
    render() {
        return (
            <div>
                <Title></Title>
            </div>
        )
    }
};
class Main extends Component {
    static contextTypes = {
        color: PropTypes.string,
        setColor:PropTypes.func
    }
    render() {
        return (
            <div>
                <h1 style={{ color: this.context.color }}>我是内容</h1>
                <button onClick={() => {this.context.setColor('green')}}>变绿</button>
                <button onClick={() => { this.context.setColor('yellow') }}>变黄</button>
            </div>
        )
    }
};
/*
1.在父组件中定义childContextType 子上下文类型
* 2.在父组件中定义一个getChildContext用来返回上下文对象
* 3.在要接收这些上下文对象的组件中contextTypes
*/
class HomePage extends Component {
    static childContextTypes = {
        color:PropTypes.string,
        setColor: PropTypes.func
    }
    constructor() {
        super();
        this.state = {
            color:'red'
        }
    }
    getChildContext () {
        return {
            color:this.state.color,
            setColor:this.setColor
        }
    }
    setColor = (color) => {
        this.setState({color});
    }
    render() {
        return(
            <div>
                <Header></Header>
                <Main/>
            </div>
        )
    }
}
export default HomePage
