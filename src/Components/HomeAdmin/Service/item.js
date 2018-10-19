import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextTruncate from 'react-text-truncate';

class Item extends Component {

    handleOnDelete(ten, id) {
        var result = window.confirm('Bạn có chắc xóa "' + ten + '" này không?');
        if (result === true) {
            var formData = new FormData();
            formData.append('token', this.props.StateInfoUser.token);
            formData.append('_method', 'DELETE');
            fetch(this.props.StateInfoSystem.domain + '/api/service/' + id, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === true) {
                        alert('Đã xóa thành công');
                        this.props.getList();
                    } else {
                        alert('Không thể xóa, vui lòng thử lại sau');
                    }
                })
                .catch(error => '');
        }
    }

    handleOnUpdate(){

    }

    render() {
        return (
            <li className="pg_content_card">
                <div className="pg_content_card_head">
                    <div className="pg_content_card_link_images" style={{ backgroundImage: 'url("' + this.props.StateInfoSystem.domain + '/' + this.props.demo + '")' }} >
                        <div className="pg_content_card_control">
                            <button type="button" className="btn btn-primary btn-rounded btn-fw">Chỉnh sửa</button>
                            <button onClick={() => this.handleOnDelete(this.props.tendichvu, this.props.id)} type="button" className="btn btn-danger btn-rounded btn-fw">Xóa</button>
                        </div>
                    </div>
                </div>
                <div className="pg_content_card_infomation">
                    <a href={"#" + this.props.tendichvu}>
                        <h3 className="pg_content_card_title">{this.props.tendichvu}</h3>
                    </a>

                    <div className="pg_content_card_description">
                        <TextTruncate
                            line={2}
                            truncateText="…"
                            text={this.props.mota}
                        />
                    </div>

                </div>
            </li>
        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(Item);
