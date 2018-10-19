import React from 'react';
import { Route } from "react-router-dom";
import RegisterService from './RegisterService';
import BuildPackage from './BuildPackage';
import HoanTatDangKi from './HoanTatDangKi';

const DBRegister = ({ match }) => {
    return (
        <div className="pg_4_userhome">
            <Route exact path={match.url} component={RegisterService} />
            <Route exact path={match.url + '/build'} component={BuildPackage} />
            <Route exact path={match.url + '/end'} component={HoanTatDangKi}/>
        </div>
    );
}

export default DBRegister;
