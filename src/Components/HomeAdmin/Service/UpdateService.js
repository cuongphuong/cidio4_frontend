import React, { Component } from 'react';
import { connect } from 'react-redux';

class UpdateService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstDV: [],
            infoPhanLoai: {
                mota: null
            },
            
            infoUpdate: {
                name: '',
                mota: '',
                giatien: null,
                demo: ''
            }
        }
    }

    resetState() {
        this.setState({
            infoUpdate: {
                name: '',
                mota: '',
                giatien: '',
                demo: null
            }
        })
    }

    componentDidMount(){
        fetch(this.props.StateInfoSystem.domain + '/api/service', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    alert('Thêm thành công dịch vụ ' + this.state.infoUpdate.name);
                    this.resetState();
                    this.props.getList();
                } else {
                    alert('Thêm không thành công, vui lòng thử lại sau');
                }
            })
            .catch(error => console.log(error));
    }

    handleSubmitForm() {
        var formData = new FormData()
        formData.append('token', this.props.StateInfoUser.token);
        formData.append('tendichvu', this.state.infoUpdate.name);
        formData.append('mota', this.state.infoUpdate.mota);
        formData.append('giatien', this.state.infoUpdate.giatien);
        formData.append('id_loaidv', this.props.idPhanLoai);
        formData.append('demo', this.state.demo);

        fetch(this.props.StateInfoSystem.domain + '/api/service', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    alert('Thêm thành công dịch vụ ' + this.state.infoUpdate.name);
                    this.resetState();
                    this.props.getList();
                } else {
                    alert('Thêm không thành công, vui lòng thử lại sau');
                }
            })
            .catch(error => console.log(error));
    }

    handleOnchanName(event) {
        this.setState({
            infoUpdate: { ...this.state.infoUpdate, name: event.target.value }
        })
    }

    handleChangeMota(event) {
        this.setState({
            infoUpdate: { ...this.state.infoUpdate, mota: event.target.value }
        })
    }

    handleChangeGiaTien(event) {
        this.setState({
            infoUpdate: { ...this.state.infoUpdate, giatien: event.target.value }
        })
    }

    onChangeFile(e) {
        this.setState({ demo: e.target.files[0] });
    }

    render() {
        return (
            <div className="modal fade" id="createNewService" tabindex="-1" role="dialog" aria-labelledby= "exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm dịch vụ mới</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên dịch vụ</label>
                                    <input onChange={(event) => this.handleOnchanName(event)} value={this.state.infoUpdate.name} type="email" className="form-control" placeholder="Tên dịch vụ mới" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Giá tiền</label>
                                    <input placeholder="Giá tiền." onChange={(event) => this.handleChangeGiaTien(event)} value={this.state.infoUpdate.giatien} className="form-control" type="number" required />
                                </div>
                                <div className="form-group">
                                    <label>Ảnh demo</label>
                                    <div className="input-group col-xs-12">
                                        <input onChange={(event) => this.onChangeFile(event)} className="form-control file-upload-info" placeholder="Upload Image" type="file" />
                                        {/* <span className="input-group-append">
                                    <button className="file-upload-browse btn btn-info" type="button">Upload</button>
                                </span> */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Mô tả</label>
                                    <textarea type="text" placeholder="Viết mô tả nhỏ hơn 255 kí tự." onChange={(event) => this.handleChangeMota(event)} value={this.state.infoUpdate.mota} className="form-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.props.handleGetCategory} type="button" className="btn btn-secondary" data-dismiss="modal">Đóng form</button>
                            <button onClick={() => this.handleSubmitForm()} type="button" className="btn btn-primary">Thêm</button>
                        </div>
                    </div>
                </div>
        </div >
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(UpdateService);