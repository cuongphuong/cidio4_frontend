import React, { Component } from 'react';

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
              <a className="btn btn-success">Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNavBar;