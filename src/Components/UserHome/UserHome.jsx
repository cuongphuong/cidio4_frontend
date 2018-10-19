import React from 'react';
import { Route } from "react-router-dom";
// import { connect } from 'react-redux';
import UserNavBar from '../AppFrame/NavBar/UserNavBar';
import Home from './Home';
import UserFooter from '../AppFrame/Footer/UserFooter';
import View from './View';
import ListPost from './ListPost';
import DBRegister from './RegisterPackage/DBRegister';

const UserHome = ({ match }) => {
    return (
        <div className="pg_4_userhome">
            <UserNavBar></UserNavBar>
            <Route exact path={match.url} component={Home} />
            <Route path={match.url + 'register'} component={DBRegister}/>
            <Route exact path={match.url + 'view/:id/:slug.html'} component={View} />
            <Route exact path={match.url + 'list/:id/:slug.html'} component={ListPost} />
            <UserFooter></UserFooter>
        </div>
    );
}

export default UserHome;
