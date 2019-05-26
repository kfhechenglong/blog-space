import React ,{Component} from 'react'
import PropTypes from 'prop-types'
export default class HashRouter extends Component {
    static childContextTypes = {
        location:PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    getChildContext() {
        return {
            location:{pathname:window.location.hash.slice(1) || '/'}
        }
    }
    // 如果没有哈希值，默认添加'/'
    componentDidMount() {
        window.location.hash = window.location.hash || '/';
        let render = () => {
            this.setState();
        }
        window.addEventListener('hashchange',render);
    }
    render() {
        return this.props.children;
    }
}
