import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            textSubmitButton: 'Đăng kí',
            checkForm: {
                phone: false,
                name: false,
                password: false,
                repassword: false
            }
        }
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    handleRegister = (e) => {
        e.preventDefault()
        var phone = this.refs.pg_numberphone.value;
        var hoten = this.refs.pg_fullname.value;
        var password = this.refs.pg_password.value;
        var repassword = this.refs.pg_repassword.value;
        var isAgree = this.refs.pg_agree.checked;

        if (!this.state.isSubmit) {
            var data = new FormData();
            data.append('sodienthoai', phone);
            data.append('hoten', hoten);
            data.append('password', password);

            if (this.checkForm(phone, hoten, password, repassword) === true && isAgree === true) {
                this.setState({ textSubmitButton: "Đang xử lý...", isSubmit: true });
                fetch(this.props.StateInfoSystem.domain + '/api/users', {
                    method: 'POST',
                    body: data
                })
                    .then(response => response.json())
                    .then(response => {
                        this.setState({ textSubmitButton: "Đăng kí", isSubmit: false });

                        if (response.status === true) {
                            var data = response.data;
                            this.setCookie("pg_dichvu_tietcuoi", data.token, 1);
                            var info = {
                                token: data.token,
                                hoten: data.user.hoten
                            }
                            var { dispatch } = this.props;
                            dispatch({
                                type: 'ADD_INFO_USER',
                                item: info
                            })
                            alert('Đăng kí thành công');
                            window.location = '/admin';
                        } else {
                            switch (response.command) {
                                case 'invalid_form':
                                    console.log(response);
                                    break;
                                case 'user_exist':
                                    alert(response.message);
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                alert(false);
            }
        } else {
            alert("Yêu cầu vẩn đang được xử lý, vui lòng chờ!");
        }

    }

    checkForm(phone, hoten, password, repassword) {
        if (password === repassword && phone.length >= 10 && hoten.length > 5 && password.length >= 4) {
            return true;
        }
        return false;
    }

    onChangeNumberphone() {
        var value = this.refs.pg_numberphone.value;
        if (value.length >= 10 && value.length <= 12) {
            this.setState({
                checkForm: { ...this.state.checkForm, phone: true }
            });
        } else {
            this.setState({
                checkform: { ...this.state.checkForm, phone: false }
            });
        }
    }

    onChangeName(event) {
        var value = this.refs.pg_fullname.value;
        if (value.length >= 5 && value.length <= 50) {
            this.setState({
                checkForm: { ...this.state.checkForm, name: true }
            });
        } else {
            this.setState({
                checkform: { ...this.state.checkForm, name: false }
            });
        }
    }

    onChangePassword(event) {
        var value = this.refs.pg_password.value;
        if (value.length >= 4 && value.length <= 15) {
            this.setState({
                checkForm: { ...this.state.checkForm, password: true }
            });
        } else {
            this.setState({
                checkform: { ...this.state.checkForm, password: false }
            });
        }
    }

    onChangeRepassword(event) {
        var value = this.refs.pg_repassword.value;
        if (value.length >= 4 && value.length <= 15 && value === this.refs.pg_password.value) {
            this.setState({
                checkForm: { ...this.state.checkForm, repassword: true }
            });
        } else {
            this.setState({
                checkform: { ...this.state.checkForm, repassword: false }
            });
        }
    }

    render() {
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper auth-page">
                    <div className="content-wrapper d-flex align-items-center auth register-bg-1 theme-one">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <h2 className="text-center mb-4">Đăng kí tài khoản</h2>
                                <div className="auto-form-wrapper">
                                    <form>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input onChange={() => this.onChangeNumberphone()} name="numberphone" ref="pg_numberphone" type="text" className="form-control" placeholder="Vui lòng nhập số điện thoại chính sác" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        {this.state.checkForm.phone === true ? <font style={{ color: 'green' }}><i className="mdi mdi-check-circle-outline" /></font> : <font style={{ color: 'red' }}><i className="mdi mdi-check-circle-outline" /></font>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input onChange={() => this.onChangeName()} name="fullname" ref="pg_fullname" type="text" className="form-control" placeholder="Nhập họ tên đầy đủ" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        {this.state.checkForm.name === true ? <font style={{ color: 'green' }}><i className="mdi mdi-check-circle-outline" /></font> : <font style={{ color: 'red' }}><i className="mdi mdi-check-circle-outline" /></font>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input onChange={() => this.onChangePassword()} name="password" ref="pg_password" type="password" className="form-control" placeholder="Mật khẩu" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        {this.state.checkForm.password === true ? <font style={{ color: 'green' }}><i className="mdi mdi-check-circle-outline" /></font> : <font style={{ color: 'red' }}><i className="mdi mdi-check-circle-outline" /></font>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input onChange={() => this.onChangeRepassword()} name="repassword" ref="pg_repassword" type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        {this.state.checkForm.repassword === true ? <font style={{ color: 'green' }}><i className="mdi mdi-check-circle-outline" /></font> : <font style={{ color: 'red' }}><i className="mdi mdi-check-circle-outline" /></font>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <div className="form-check form-check-flat mt-0">
                                                <label className="form-check-label">
                                                    <input value ref="pg_agree" type="checkbox" className="form-check-input" defaultChecked /> Đồng ý đăng kí <i className="input-helper" /></label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button onClick={(even) => this.handleRegister(even)} className="btn btn-primary submit-btn btn-block">{this.state.textSubmitButton}</button>
                                        </div>
                                        <div className="text-block text-center my-3">
                                            <span className="text-small font-weight-semibold">Tôi đã có tài khoản ?</span>
                                            <Link to="/login" className="text-black text-small"> Đăng nhập</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>

        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(Register);
