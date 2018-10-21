import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class UserNavBar extends Component {
  handleLogout() {
    cookie.remove('logintc', { path: '/' })
    window.location = "/";
  }

  render() {
    return (
      <div>
        <div className="pg_4_header">
          <div className="container">
            <div className="pg_4_header_logo">
              <div className="pg_logo"></div>
            </div>
            <div className="pg_4_header_right_menu">
              {this.props.StateInfoUser.token !== null ?
                <div className="dropdown show" style={{ float: 'right' }}>
                  <a style={{ padding: '0px' }} className="btn btn-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.StateInfoUser.token !== null ? <a style={{ float: 'right' }}>Xin chào {this.props.StateInfoUser.hoten}</a> : <Link to='/acc/login' style={{ color: 'black' }}>Đăng nhập</Link>}
                  </a>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a style={{paddingTop: '5px', paddingBottom: '5px'}} className="btn btn-link dropdown-item" onClick={() => this.handleLogout()}>Đăng xuất</a>
                    <Link style={{paddingTop: '5px', paddingBottom: '5px'}}  className="btn btn-link dropdown-item" to='/admin' >Admin Panel</Link>
                  </div>
                </div>

                :
                <Link className="btn btn-success" to='/acc/login' style={{ color: 'black' }}>Đăng nhập</Link>}
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