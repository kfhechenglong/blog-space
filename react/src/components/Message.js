import React, { Component } from 'react'
class List extends Component {
    render () {
        return (
            <React.Fragment>
                {
                    this.props.message.map(item => <li key={item}>{item}</li>)
                }
            </React.Fragment>
        )
    }
}
export default class Messages extends Component {
    constructor() {
        super();
        this.state = {
            message:[1,2,3]
        }
    }
    render () {
        return (
            <ul>
                <List message={this.state.message} />
            </ul>
        )
    }
};
