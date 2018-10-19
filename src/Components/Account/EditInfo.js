import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoUS: {
                "id": null,
                "sodienthoai": null,
                "hoten": null,
                "diachi": null,
                "gioitinh": null,
                "id_chucvu": null,
            }
        }
    }

    getInfo() {
        fetch(this.props.StateInfoSystem.domain + '/api/users/get/' + this.props.match.params.id + '?token=' + this.props.StateInfoUser.token, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        infoUS: response.user
                    });
                } else {
                    alert('Không thể tìm thấy user này');
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getInfo();
    }

    handleUpdateInfo(e) {
        e.preventDefault();
        var data = new FormData();
        data.append('sodienthoai', this.state.infoUS.sodienthoai);
        data.append('hoten', this.state.infoUS.hoten);
        data.append('diachi', this.state.infoUS.diachi);
        data.append('token', this.props.StateInfoUser.token);
        data.append('_method', 'PUT');
        
        fetch(this.props.StateInfoSystem.domain + '/api/users/' + this.props.match.params.id, {
            method: 'POST',
            body: data
        })
            .then(response => console.log(response))
            .then(response => {
                if(response.status === true){
                    alert(response.message);
                } else {
                    alert(response.message);
                }
            })
            .catch(error => console.log(error));
    }

    handleReset(e) {
        e.preventDefault();
    }

    handleChangeHoten(event) {
        this.setState({ infoUS: { ...this.state.infoUS, hoten: event.target.value } });
    }

    handleChangeDiachi(event) {
        this.setState({ infoUS: { ...this.state.infoUS, diachi: event.target.value } });
    }

    handleChangeSdt(event) {
        this.setState({ infoUS: { ...this.state.infoUS, sodienthoai: event.target.value } });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nhập mật khẩu củ</label>
                                    <input className="form-control" placeholder="Mật khẩu củ" type="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Nhập mật khẩu mới</label>
                                    <input className="form-control" placeholder="Mật khẩu mới" type="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Nhập lại mật khẩu</label>
                                    <input className="form-control" placeholder="Xác nhận mật khẩu mới" type="password" />
                                </div>
                                <button type="submit" className="btn btn-success mr-2">Lưu lại</button>
                                <button onClick={(e) => this.handleReset(e)} className="btn btn-light">Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputName1">Họ tên đầy đủ</label>
                                    <input onChange={(event) => this.handleChangeHoten(event)} value={this.state.infoUS.hoten !== null ? this.state.infoUS.hoten : ''} className="form-control" placeholder="Họ Và Tên" type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail3">Số điện thoại</label>
                                    <input onChange={(event) => this.handleChangeSdt(event)} value={this.state.infoUS.sodienthoai !== null ? this.state.infoUS.sodienthoai : ''} className="form-control" placeholder="Số điện thoại (Vui lòng nhập chính sác)" type="text" />
                                </div>
                                <div className="form-group">
                                    <label>Ảnh đại diện (chưa xây dựng)</label>
                                    <input name="img[]" className="file-upload-default" type="file" />
                                    <div className="input-group col-xs-12">
                                        <input className="form-control file-upload-info" disabled placeholder="Upload Image" type="file" />
                                        {/* <span className="input-group-append">
                                            <button className="file-upload-browse btn btn-info" type="button">Upload</button>
                                        </span> */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input onChange={(event) => this.handleChangeDiachi(event)} value={this.state.infoUS.diachi !== null ? this.state.infoUS.diachi : ''} className="form-control" placeholder="Location" type="text" />
                                </div>
                                <button onClick={(e) => this.handleUpdateInfo(e)} type="submit" className="btn btn-success mr-2">Lưu lại</button>
                                <button onClick={(e) => this.handleReset(e)} className="btn btn-light">Reset</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(EditInfo);
