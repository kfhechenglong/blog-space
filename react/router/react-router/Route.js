import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Route extends Component {
    static contextTypes = {
        location: PropTypes.object,
        history:PropTypes.object
    }
    render() {
        let { path, component:Component} = this.props;
        let { location: {pathname}} = this.context;
        if(path == pathname || pathname.startsWith(path)) {
            return <Component location={this.context.location} history={this.context.history}/>
        } else {
            return null;
        }
    }
}
