import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
              {this.props.StateInfoUser.token !== null ? <div style={{float: 'right'}}>Xin chào {this.props.StateInfoUser.hoten}</div> : <Link to='/acc/login' className="btn btn-success" style={{color: 'black'}}>Đăng nhập</Link>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(function (state) {
  return { StateInfoUser: state.StateInfoUser }
})(UserNavBar);