import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from '../AppRouter/AppRouter';
import { connect } from 'react-redux';
import './App.css';
import cookie from 'react-cookies'

class App extends Component {
  getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  checkCookie(ck_data) {
    var { dispatch } = this.props;
    if (ck_data !== "") {
      var formData = new FormData();
      formData.append('token', ck_data);
      fetch(this.props.StateInfoSystem.domain + '/api/users/me', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            var info = {
              id: response.user.id,
              hoten: response.user.hoten,
              id_chucvu: response.user.id_chucvu,
              token: ck_data,
              chucvu: (response.user.id_chucvu === 1 ? 'Admintrantor' : (response.user.id_chucvu === 2 ? 'Mod' : 'Thành viên')),
            }
            dispatch({
              type: 'ADD_INFO_USER',
              item: info
            });
          } else {
            document.cookie = 'pg_dichvu_tietcuoi=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            dispatch({
              type: 'ADD_INFO_USER',
              item: { token: null, hoten: null }
            });
          }
        })
        .catch(error => console.log(error));
    }
  }

  componentWillMount() {
    // var ck_data = this.getCookie("authentication_tietcuoi");
    var ck_data = cookie.load('logintc');
    if (ck_data !== undefined)
      this.checkCookie(ck_data);
  }

  render() {
    return (
      <Router>
        <AppRouter></AppRouter>
      </Router>
    );
  }
}

export default connect(function (state) {
  return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(App);
