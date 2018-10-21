import React from 'react';
import { connect } from 'react-redux';
import Footer from '../AppFrame/Footer/AdminFooter';
import NavBar from '../AppFrame/NavBar/AdminNavBar';
import SlideBar from '../AppFrame/SlideBar/AdminSlideBar';
import ListUser from './UserManager/ListUser';
import { Route } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import ListOrder from './Dashboard/ListOrder';
import EditInfo from '../Account/EditInfo';
import Posts from './Blogs/Posts';
import Categorys from './Blogs/Categorys';
import Editor from './Blogs/Editor';
import DashboardDv from './Service/DashboardDv';
import GroupDetail from './Service/GroupDetail';
import BuildPackage from './Service/Pakage/BuildPackage';
import ListPackage from './Service/Pakage/ListPackage';
import DetailPackage from './Service/Pakage/DetailPackage';
import DoanhThu from './ThongKe/DoanhThu/DoanhThu';
import DuyetDonHang from './Service/DuyetDonHang';

//css import
import '../../styles/template/vendor.bundle.addons.css';
import DoanhThuCacNam from './ThongKe/DoanhThu/DoanhThuCacNam';
import ThongKeTongQuan from './ThongKe/ThongKeTongQuan';
import DoanhThuIndex from './ThongKe/DoanhThu/DoanhThuIndex';
import DonHang from './ThongKe/DonHang/DonHang';

const HomeAdmin = ({ match, StateInfoUser }) => {
    if (StateInfoUser.id_chucvu != null) {
        if (StateInfoUser.id_chucvu <= 2) {
            return (
                <div className="container-scroller">
                    <NavBar></NavBar>
                    <div className="container-fluid page-body-wrapper">
                        <SlideBar></SlideBar>
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <Route exact path={match.url} component={Dashboard} />
                                <Route exact path={match.url + '/order'} component={ListOrder} />
                                {/* // */}

                                <Route exact path={match.url + '/users'} component={ListUser} />
                                <Route exact path={match.url + '/user/edit/:id'} component={EditInfo} />

                                {/* // */}
                                <Route exact path={match.url + '/post/list'} component={Posts} />
                                <Route exact path={match.url + '/post/editor/:slug/:id'} component={Editor} />
                                <Route exact path={match.url + '/category'} component={Categorys} />
                                <Route exact path={match.url + '/service/dashboard'} component={DashboardDv} />
                                <Route exact path={match.url + '/service/group/:id'} component={GroupDetail} />
                                <Route exact path={match.url + '/service/build-package'} component={BuildPackage} />
                                <Route exact path={match.url + '/service/package/lst'} component={ListPackage} />
                                <Route exact path={match.url + '/service/package/lst/:id'} component={DetailPackage} />
                                <Route exact path={match.url + '/thongke/home'} component={ThongKeTongQuan} />
                                <Route exact path={match.url + '/thongke/doanhthu/home'} component={DoanhThuIndex} />
                                <Route exact path={match.url + '/thongke/doanhthu/thang'} component={DoanhThu} />
                                <Route exact path={match.url + '/thongke/doanhthu/nam'} component={DoanhThuCacNam} />
                                <Route exact path={match.url + '/thongke/donhang'} component={DonHang} />
                                <Route exact path={match.url + '/don-hang'} component={DuyetDonHang} />
                            </div>
                            <Footer></Footer>
                        </div>
                    </div>
                </div>
            );
        } else {
            window.location = "/";
        }
    } else {
        return (<div>Verify user, waiting a moment...</div>)
    }
}

export default connect(function (state) {
    return { StateApp: state.StateApp, StateInfoUser: state.StateInfoUser }
})(HomeAdmin);