import React, {Component} from 'react'

/*
高阶组件就是一个函数，用来封装重复的逻辑
传进一个老组件，返回一个新组件
*/

export default function (OldComponent,name,palceholder) {
    class NewComponent extends Component {
        constructor () {
            super();
            this.state = {data:''}
        }
        componentDidMount () {
            fetch('/user.json').then((response) => response.json()).then(user => {
                console.log(user);
                this.setState({ data: user[name] || palceholder })
            });
        }
        // save = (event) => {
        //     localStorage.setItem(name, event.target.value)
        // }
        render () {
            return <OldComponent data={this.state.data}/>
        }
    }
    return NewComponent;
}
