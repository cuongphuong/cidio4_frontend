import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            content: null,
            lstCategory: [],
            selectCategory: 0,
            title: null,
            update: {
                isUpdate: false,
                id: null
            }
        }
    }

    componentDidMount() {
        if (this.props.match.params.slug === 'update') {
            //fetch content bai viet
            fetch(this.props.StateInfoSystem.domain + '/api/posts/' + this.props.match.params.id + '?token=' + this.props.StateInfoUser.token, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === true) {
                        this.setState({
                            title: response.data.tieude,
                            content: response.data.noidung,
                            selectCategory: response.data.id_theloai,
                            update: {
                                isUpdate: true,
                                id: this.props.match.params.id
                            }
                        })
                    } else {
                        alert('Id bài viết là không hợp lệ');
                    }
                })
                .catch(error => console.log(error));
        } else {

        }

        fetch(this.props.StateInfoSystem.domain + '/api/all/categorys', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstCategory: response.data,
                    });
                }
            })
            .catch(error => console.log(error));

    }

    handleChangeTitle(evt) {
        this.setState({
            title: evt.target.value
        })
    }

    onChange(evt) {
        this.setState({ content: evt.editor.getData() });
    }

    handleChangeSelected(e) {
        this.setState({ selectCategory: e.target.value });
    }

    handleSavePost() {
        var result, formData;
        if (this.state.update.isUpdate === true) {
            result = window.confirm("Xác nhận thay đổi nội dung bài viết ?");
            if (result === true) {
                formData = new FormData();
                formData.append('token', this.props.StateInfoUser.token);
                formData.append('tieude', this.state.title);
                formData.append('noidung', this.state.content);
                formData.append('id_theloai', this.state.selectCategory);
                formData.append('_method', 'PUT');

                fetch(this.props.StateInfoSystem.domain + '/api/posts/' + this.state.update.id, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        if (response.status === true) {
                            alert('Đã chỉnh sửa bài viết ' + response.data.tieude);
                            // <Redirect to="/admin/post"></Redirect>
                        } else {
                            alert('Không thể thực hiện thay đổi, thử lại sau.');
                        }
                    })
                    .catch(error => console.log(error));
            }
        } else {
            result = window.confirm("Đóng trình soạn thảo, lưu bài viết ?");
            if (result === true) {
                formData = new FormData();
                formData.append('token', this.props.StateInfoUser.token);
                formData.append('tieude', this.state.title);
                formData.append('noidung', this.state.content);
                formData.append('id_theloai', this.state.selectCategory);

                fetch(this.props.StateInfoSystem.domain + '/api/posts', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        if (response.status === true) {
                            alert('Đã thêm thành công bài viết ' + response.data.tieude);
                            // <Redirect to="/admin/post"></Redirect>
                        } else {
                            alert('Không thể thêm bài viết, thử lại sau.');
                        }
                    })
                    .catch(error => console.log(error));
            }
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">Tiêu đề</label>
                            <div className="col-sm-11">
                                <input value={this.state.title} onChange={(event) => this.handleChangeTitle(event)} type="text" placeholder="Nhập tiêu đề bài viết(tối đa 255 kí tự)" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">Chủ đề</label>
                            <div className="col-sm-11">
                                <select value={this.state.selectCategory} onChange={(event) => this.handleChangeSelected(event)} class="form-control">
                                    <option>Chọn chủ đề bài viết</option>
                                    {
                                        (this.state.lstCategory.length > 0) ? this.state.lstCategory.map((e, i) => <option selected = {e.id_theloai === this.state.selectCategory ? 'true' : 'false'} value={e.id_theloai}>{e.tentheloai}</option>) : ''
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="fluid-container">
                        <CKEditor
                            // placeholder ="Viết tiếng việt có dấu giúp tôn trọng người đọc"
                            activeClass="p10"
                            content={this.state.content}
                            events={{
                                "change": this.onChange
                            }}
                        />
                        <button onClick={() => this.handleSavePost()} style={{ marginTop: '5px' }} type="button" class="btn btn-success btn-fw float-right">Lưu bài viết</button>
                        <button style={{ marginTop: '5px', marginRight: '5px' }} type="button" class="btn btn-primary btn-fw float-right">Xem trước</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(Editor);
