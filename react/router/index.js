import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap3/dist/css/bootstrap.css'
import App from './components/App.js'
import User from "./components/User";
import Protected from "./components/Protected";
import Login from "./components/Login";
// HashRouter 通过路径里面的哈希实现
// BrowserRouter 是通过h5中的history实现的
// import { HashRouter as Router, Route } from 'react-router-dom'
import {HashRouter as Router,Route} from'./react-router/index'
/*
    测试驱动开发，先写一个测试用例
    Router 是路由容器

*/
let Home = () => <div>首页</div>;
// let User = () => <div>用户管理</div>;
let Profile = () => <div>个人中心</div>
ReactDOM.render(
    <App>
        <Route path="/home" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Protected path="/profile" component={Profile} />
    </App>,
    document.querySelector('#root')
)
