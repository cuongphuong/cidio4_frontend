import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            cungchuyenmuc: [], 
            allcategory: []
        }
    }

    timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " năm trước";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " tháng trước";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " ngày trước";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " giờ trước";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " phút trước";
        }
        return Math.floor(seconds) + " giây trước";
    }

    to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + '/api/posts/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        content: response.data
                    });

                    fetch(this.props.StateInfoSystem.domain + "/api/posts/getcate/" + response.data.id_theloai + "/1/5", {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(response => {
                            if (response.status === true) {
                                this.setState({
                                    cungchuyenmuc: response.data
                                });
                            }
                        })
                        .catch(error => console.log());
                }
            })
            .catch(error => console.log());


            fetch(this.props.StateInfoSystem.domain + "/api/all/categorys", {
                method: 'GET'
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === true) {
                        this.setState({
                            allcategory: response.data
                        });
                        console.log(response.data)
                    }
                })
                .catch(error => console.log());
    }

    render() {
        if (this.state.content != null) {
            return (
                <div>
                    <div className="pg_4_view_breadcrumb">
                        <div className="container">
                            <h1>{this.state.content.tentheloai}</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item"><a href={"/list/" + this.state.content.id_theloai + "/" + this.to_slug(this.state.content.tentheloai) + ".html"}>{this.state.content.tentheloai}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{this.state.content.tieude}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 pg_4_contentpost">
                                <h1>{this.state.content.tieude}</h1>
                                <p className="pg_4_timepost">{this.timeSince(new Date(this.state.content.created_at))}</p>
                                <div className="pg_4_social">
                                    <div className="fb-share-button" data-href={window.location.href} data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse" className="fb-xfbml-parse-ignore">Chia sẻ</a></div>
                                </div>
                                <div className="pg_4_content">
                                    {ReactHtmlParser(this.state.content.noidung)}
                                    <p className="pg_4_postby">{"Đăng bởi " + this.state.content.tenthanhvien}</p>
                                </div>
                                <h3 className="pg_4_title" style={{ marginTop: '20px' }}>Cùng chủ đề</h3>
                                <ul className="pg_4_cungchuyenmuc">
                                    {
                                        (this.state.cungchuyenmuc.length > 0) ? this.state.cungchuyenmuc.map((item, i) => <li key={i}>
                                            <a href={"/view/" + item.id_baiviet + "/" + this.to_slug(item.tieude) + ".html"}>{item.tieude}</a>
                                            <span style={{ color: '#919191' }}> - {this.timeSince(new Date(item.created_at))}</span> &nbsp;|&nbsp;
                                            <a rel="nofollow" className="article-link" style={{ color: '#34a4dd' }} href={"/list/" + this.state.content.id_theloai + "/" + this.to_slug(this.state.content.tentheloai) + ".html"}>{this.state.content.tentheloai}</a>
                                        </li>) : ''
                                    }

                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h3 className="pg_4_title" style={{ marginTop: '20px' }}>Chủ đề</h3>
                                    {
                                        this.state.allcategory.length > 0 ? this.state.allcategory.map((item, i) => <div key={i} className="pg_4_chude_list"><a href={"/list/" + item.id_theloai + "/" + this.to_slug(item.tentheloai) + ".html"}>{item.tentheloai}</a></div>) : ''
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div className="container" style={{textAlign: 'center'}}>Vui lòng chờ dữ liệu... !</div>);
        }
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(View);