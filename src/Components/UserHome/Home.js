import React, { Component } from 'react';
import Slider from 'react-slick';
import Item from './Item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { error } from 'util';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstpost: []
        }
    }


    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + "/api/posts/getpage/1/5", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstpost: response.data
                    });
                }
            })
            .catch(error => console.log())
    }

    render() {
        const settings = {
            infinite: true,
            dots: true,
            arrows: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1920,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        }
        return (
            <div className="pg_4_content">
                <div className="pg_4_baner">
                    <div className="container">
                        <div className="pg_4_sologan">
                            <h1>Nền tảng quản lý và bán hàng đa kênh được sử dụng nhiều nhất Việt Nam</h1>
                        </div>
                        <div className="pg_4_using">
                            <Link to='/register'>
                                <button className="btn-lg pg_4_register">Đăng kí ngay</button>
                            </Link>

                        </div>
                    </div>
                    <div className="pg_4_banner">
                        <div className="pg_banner">Banner 1113 * 447</div>
                    </div>
                </div>
                <div className="container pg_4_help_block">
                    <h2>Quy trình đăng kí tổ chức tiệt cưới</h2>
                    <div className="row">
                        <div className="col-md-6" >
                            <h3 className="pg_4_title">Trình tự đăng kí đơn giản</h3>
                            <p style={{ margin: '0' }}>Chúng tôi giúp bạn đăng kí dịch vụ một cách dể dàng và nhanh chóng trên hệ thống của chúng tôi.</p>

                            <ul className="pg_4_helpcontent_list">
                                <li>
                                    <i className="icon-theme">
                                        <img src="https://www.sapo.vn/Themes/Portal/Default/Styles_New/Images/index-home/icon-theme.svg" />
                                    </i>
                                    <div className="info">Truy cập vào website tìm đến "Đăng kí ngay" trên trang chủ website.</div>
                                </li>
                                <li>
                                    <i className="icon-device">
                                        <img src="https://www.sapo.vn/Themes/Portal/Default/Styles_New/Images/index-home/icon-device.svg" />
                                    </i>
                                    <div className="info">
                                        Đăng kí thực đơn của bạn bằng cách nhấn vào button thêm trên mổi hóa đơn sau đó nhấn "Hoàn thành" và nhập thông tin.
    </div>
                                </li>
                                <li>
                                    <i className="icon-ecommerce">
                                        <img src="https://www.sapo.vn/Themes/Portal/Default/Styles_New/Images/index-home/icon-ecommerce.svg" />
                                    </i>
                                    <div className="info">
                                        Xác nhận lại hóa đơn và gửi về hệ thống. Chúng tôi sẽ liên hệ với bạn khi nhận được hóa đơn của bạn.
    </div>
                                </li>
                            </ul>

                        </div>
                        <div className="col-md-6">
                            <div className="pg_logo_help">
                                Logo 750 * 350
                                </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginTop: '20px', paddingBottom: '20px' }}>Bài viết của chúng tôi</h2>
                    <Slider {...settings}>
                        {(this.state.lstpost.length > 0) ? this.state.lstpost.map((item, i) => <Item title={item.tieude} id_theloai={item.id_theloai} tenthanhvien={item.tenthanhvien} tentheloai={item.tentheloai} noidung={item.noidung} images={item.images} timepost={item.created_at} key={i} idPost={item.id_baiviet}></Item>) : console.log("Danh sách bài viết nổi bật rỗng")}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem }
})(Home);