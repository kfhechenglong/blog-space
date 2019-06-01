import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Route extends Component {
    static contextTypes = {
        location: PropTypes.object,
        history:PropTypes.object
    }
    render() {
        let { path, component:Component,render} = this.props;
        let { location: { pathname }, location} = this.context;

        let props = {
            location,
            history:this.context.history
        }
        if(path == pathname || pathname.startsWith(path)) {
            if(Component) {
                return <Component location={this.context.location} history={this.context.history} />
            } else if (render) {
                return render(props)
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
