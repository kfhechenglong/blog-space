/*
 * @Author: 绝对零度
 * @Date: 2019-05-26 13:17:34
 * @Last Modified by: 绝对零度
 * @Last Modified time: 2019-05-26 13:29:36
 */
/*
高阶组件：传入一个组件，返回一个新的组件
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import UserName from './UserName.js'
class Memo extends Component {
    render () {
        return (
            <form>
                <UserName/>
                <br/>
                留言 <textarea></textarea>
            </form>
        )
    }
}
export default Memo;
