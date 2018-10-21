import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
                    <Link className='navbar-brand brand-logo' to="/admin">
                        <div style={{color: 'green', fontWeight: 'bold', fontSize: '25px', marginTop: '10px'}}>AdminPanel</div>
                    </Link>
                    <a className="navbar-brand brand-logo-mini" href="index.html">
                        <img src="images/logo-mini.svg" alt="logo" />
                    </a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center">
                    <ul className="navbar-nav navbar-nav-left header-links d-none d-md-flex">
                        <li className="nav-item">
                            <Link to="/admin/order" className="nav-link">Đơn hàng mới
                                <span className="badge badge-primary ml-1">New</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/admin/thongke/home" className="nav-link">
                                <i className="mdi mdi-elevation-rise" />Thống kê</Link>
                        </li>
                        {/* <li className="nav-item">
                            <a href="/" className="nav-link">
                                <i className="mdi mdi-bookmark-plus-outline" />Score</a>
                        </li> */}
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="/" data-toggle="dropdown" aria-expanded="false">
                                <i className="mdi mdi-file-document-box" />
                                <span className="count">7</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                                <div className="dropdown-item">
                                    <p className="mb-0 font-weight-normal float-left">You have 7 unread mails</p>
                                    <span className="badge badge-info badge-pill float-right">View all</span>
                                </div>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="images/faces/face4.jpg" alt="pgc_image" className="profile-pic" />
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-medium text-dark">David Grey<span className="float-right font-weight-light small-text">1 Minutes ago</span>
                                        </h6>
                                        <p className="font-weight-light small-text">The meeting is cancelled </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="images/faces/face2.jpg" alt="pgc_image" className="profile-pic" />
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-medium text-dark">Tim Cook<span className="float-right font-weight-light small-text">15 Minutes ago</span>
                                        </h6>
                                        <p className="font-weight-light small-text"> New product launch </p>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="images/faces/face3.jpg" alt="pgc_image" className="profile-pic" />
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-medium text-dark"> Johnson <span className="float-right font-weight-light small-text">18 Minutes ago</span>
                                        </h6>
                                        <p className="font-weight-light small-text">  Upcoming board meeting </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="/" data-toggle="dropdown">
                                <i className="mdi mdi-bell" />
                                <span className="count">4</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                <a className="dropdown-item">
                                    <p className="mb-0 font-weight-normal float-left">You have 4 new notifications </p>
                                    <span className="badge badge-pill badge-warning float-right">View all</span>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="mdi mdi-alert-circle-outline mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-medium text-dark">Application Error</h6>
                                        <p className="font-weight-light small-text"> Just now</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-warning">
                                            <i className="mdi mdi-comment-text-outline mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-medium text-dark">Settings</h6>
                                        <p className="font-weight-light small-text"> Private message</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                            <i className="mdi mdi-email-outline mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-medium text-dark">New user registration</h6>
                                        <p className="font-weight-light small-text"> 2 days ago</p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown d-none d-xl-inline-block">
                            <a className="nav-link dropdown-toggle" id="UserDropdown" href="/" data-toggle="dropdown" aria-expanded="false">
                                <span className="profile-text">Xin chào, {this.props.StateInfoUser.hoten}</span>
                                <img className="img-xs rounded-circle" src="images/faces/face1.jpg" alt="Profile" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                                <a className="dropdown-item p-0">
                                    <div className="d-flex border-bottom">
                                        <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                            <i className="mdi mdi-bookmark-plus-outline mr-0 text-gray" />
                                        </div>
                                        <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                                            <i className="mdi mdi-account-outline mr-0 text-gray" />
                                        </div>
                                        <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                            <i className="mdi mdi-alarm-check mr-0 text-gray" />
                                        </div>
                                    </div>
                                </a>
                                <Link to={'/admin/user/edit/' + this.props.StateInfoUser.id} className="dropdown-item mt-2"> Quản lý tài khoản</Link>
                                <a className="dropdown-item"> Kiểm tra tin nhắn </a>
                                <a className="dropdown-item">Đăng xuất</a>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="mdi mdi-menu" />
                    </button>
                </div>
            </nav>
        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser }
})(NavBar);
