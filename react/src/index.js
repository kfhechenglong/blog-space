import React from 'react';
import ReactDOM from 'react-dom';
import Memo from './components/Message.js'
function A () {
    return (<div>111</div>)
}
ReactDOM.render(<Memo />, document.querySelector('#root'));
