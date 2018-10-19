import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Item extends Component {
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

    render() {
        return (
            <li className="pg_content_card">
                <div className="pg_content_card_head">
                    <Link className="pg_content_card_link_images" to={"/post/" + this.props.idPost+ "/" + this.to_slug(this.props.title) + ".html"} style={{ backgroundImage: 'url("' + this.props.images + '")' }} />
                </div>
                <div className="pg_content_card_infomation">
                    <Link to={"/post/" + this.props.idPost+ "/" + this.to_slug(this.props.title) + ".html"}>
                        <h3 className="pg_content_card_title">{this.props.title}</h3>
                    </Link>
                    <p className="pg_content_card_description">{this.props.description}</p>
                    <div className="pg_content_card_timepost">
                        <img alt="dfg" src="https://images.vexels.com/media/users/3/139556/isolated/preview/1718a076e29822051df8bcf8b5ce1124-android-logo-by-vexels.png" />
                        <a href="/">IOS</a>
                        <p>{this.props.timepost}</p>
                    </div>
                </div>
            </li>
        );
    }
}

export default Item;