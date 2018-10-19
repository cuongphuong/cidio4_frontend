import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Login from '../Account/Login';
import Register from '../Account/Register';
import ErrorPage from '../App/ErrorPage';
import HomeAdmin from '../HomeAdmin/HomeAdmin.jsx';
import UserHome from '../UserHome/UserHome.jsx';

class RouterURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/admin" component={HomeAdmin} />
                    <Route exact path="/acc/login" component={Login} />
                    <Route exact path="/acc/register" component={Register} />
                    <Route path="/" component={UserHome} />
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        );
    }
}

export default RouterURL;