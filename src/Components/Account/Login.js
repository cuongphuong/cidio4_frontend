import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            textSubmitButton: 'Đăng nhập',
        }
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }

    handleLogin(e) {
        e.preventDefault()
        this.setState({ isSubmit: true, textSubmitButton: "Vui lòng chờ..." });
        var numberphone = this.refs.pg_numberphone.value;
        var password = this.refs.pg_password.value;

        var data = new FormData();
        data.append('sodienthoai', numberphone);
        data.append('password', password);

        fetch(this.props.StateInfoSystem.domain + '/api/auth/login', {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ isSubmit: false, textSubmitButton: "Đăng nhập" });
                if (response.status === true) {
                    console.log(response)
                    var data = response.data;
                    // this.setCookie("authentication_tietcuoi", data.token, 7);
                    cookie.save('logintc', data.token, { path: '/' })
                    var info = {
                        id: data.user.id,
                        token: data.token,
                        hoten: data.user.hoten,
                        chucvu: (data.user.id_chucvu === 1 ? 'Admintrantor' : (data.user.id_chucvu === 2 ? 'Mod' : 'Thành viên')),
                        id_chucvu: data.user.id_chucvu
                    }
                    var { dispatch } = this.props;
                    dispatch({
                        type: 'ADD_INFO_USER',
                        item: info
                    });
                    alert('Đăng nhập thành công');
                    window.location = '/';
                } else {
                    console.log(response);
                    alert('Đăng nhập thất bại, vui lòng thử lại sau');
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper auth-page">
                    <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auto-form-wrapper">
                                    <form>
                                        <div className="form-group">
                                            <label className="label">Số điện thoại</label>
                                            <div className="input-group">
                                                <input name="numberphone" ref="pg_numberphone" type="text" className="form-control" placeholder="Số điện thoại" minlength="10" maxlength="11" required/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <i className="mdi mdi-check-circle-outline" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Mật khẩu</label>
                                            <div className="input-group">
                                                <input name="password" ref="pg_password" type="password" className="form-control" placeholder="Mật khẩu" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <i className="mdi mdi-check-circle-outline" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button onClick={(event) => this.handleLogin(event)} className="btn btn-primary submit-btn btn-block">{this.state.textSubmitButton}</button>
                                        </div>
                                        <div className="form-group d-flex justify-content-between">
                                            <div className="form-check form-check-flat mt-0">
                                                <label className="form-check-label">
                                                    <input type="checkbox" className="form-check-input" defaultChecked /> Nhớ đăng nhập<i className="input-helper" /></label>
                                            </div>
                                            <a href="/" className="text-small forgot-password text-black">Quên mật khẩu</a>
                                        </div>
                                        {/* <div className="form-group">
                                            <button className="btn btn-block g-login">
                                                <img className="mr-3" src="../../images/file-icons/icon-google.svg" alt />Log in with Google</button>
                                        </div> */}
                                        <div className="text-block text-center my-3">
                                            <span className="text-small font-weight-semibold">Chưa có tài khoản ?</span>
                                            <Link to="/register" className="text-black text-small"> Đăng kí tài khoản</Link>
                                        </div>
                                    </form>
                                </div>
                                <ul className="auth-footer">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li>
                                        <a href="/">Trợ giúp</a>
                                    </li>
                                    <li>
                                        <a href="/">Về chúng tôi</a>
                                    </li>
                                </ul>
                                <p className="footer-text text-center">copyright © 2018 Bootstrapdash. All rights reserved.</p>
                            </div>
                        </div>
                    </div>{/* content-wrapper ends */}
                </div>{/* page-body-wrapper ends */}
            </div>

        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(Login);
