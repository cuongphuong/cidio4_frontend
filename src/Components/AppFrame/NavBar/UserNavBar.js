import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class UserNavBar extends Component {
  render() {
    return (
      <div>
        <div className="pg_4_header">
          <div className="container">
            <div className="pg_4_header_logo">
              <div className="pg_logo"></div>
            </div>
            <div className="pg_4_header_right_menu">
              <Link to='/acc/login' className="btn btn-success" style={{color: 'black'}}>Đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNavBar;