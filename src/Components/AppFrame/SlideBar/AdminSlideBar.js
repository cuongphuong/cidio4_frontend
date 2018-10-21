import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class SlideBar extends Component {
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul style={{ position: 'fixed' }} className="nav">
                    <li className="nav-item nav-profile">
                        <div className="nav-link">
                            <div className="user-wrapper">
                                <div className="profile-image">
                                    <img src="images/faces/face1.jpg" alt="profile" />
                                </div>
                                <div className="text-wrapper">
                                    <p className="profile-name">{this.props.StateInfoUser.hoten}</p>
                                    <div>
                                        <small className="designation text-muted">{this.props.StateInfoUser.chucvu}</small>
                                        <span className="status-indicator online" />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-success btn-block"><i className="mdi mdi-plus" /> Thêm thông báo</button>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                            <i className="menu-icon mdi mdi-television" />
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" href="#ui-baiviet" aria-expanded="false" aria-controls="ui-basic">
                            <i className="menu-icon mdi mdi-content-copy" />
                            <span className="menu-title">Quản lý bài viết</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-baiviet" style={{}}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/post/list">Danh sách bài viết</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/post/editor/add/new">Đăng bài viết</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/category">Quản lý chủ đề bài viết</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" href="#ui-dichvu" aria-expanded="false" aria-controls="ui-basic">
                            <i className="menu-icon mdi mdi-format-header-5" />
                            <span className="menu-title">Quản lý dịch vụ</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-dichvu" style={{}}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/service/dashboard">Quản lý các dịch vụ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/service/package/lst">Quản lý gói dịch vụ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/service/build-package">Buil gói dịch vụ</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" href="#ui-users" aria-expanded="false" aria-controls="ui-basic">
                            <i className="menu-icon mdi mdi-account" />
                            <span className="menu-title">Quản lý thành viên</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-users" style={{}}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/users">Danh sách thành viên</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" href="#ui-thongke" aria-expanded="false" aria-controls="ui-basic">
                            <i className="menu-icon mdi mdi-format-header-5" />
                            <span className="menu-title">Thống kê</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-thongke" style={{}}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/thongke/home">Tổng quan</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/thongke/doanhthu/home">Thống kê doanh thu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/thongke/donhang">Thống kê đơn hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="index.html">
                            <i className="menu-icon mdi mdi-auto-fix" />
                            <span className="menu-title">Quản lý thông tin website</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser }
})(SlideBar);
