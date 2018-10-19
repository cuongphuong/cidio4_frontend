import React, { Component } from 'react';
import { connect } from 'react-redux';
class CreateServiceGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoCreate: {
                name: '',
                mota: '',
            }
        }
    }

    handleOnchanName(event) {
        this.setState({
            infoCreate: { ...this.state.infoCreate, name: event.target.value }
        })
    }

    handleChangeMota(event) {
        this.setState({
            infoCreate: { ...this.state.infoCreate, mota: event.target.value }
        })
    }

    resetState(){
        this.setState({
            infoCreate: {
                name: '',
                mota: ''
            }
        })
    }

    handleSubmitForm() {
        var formData = new FormData()
        formData.append('token', this.props.StateInfoUser.token);
        formData.append('tenloaidv', this.state.infoCreate.name);
        formData.append('mota', this.state.infoCreate.mota);

        fetch(this.props.StateInfoSystem.domain + '/api/sercate', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    alert('Thêm thành công nhóm dịch vụ ' + this.state.infoCreate.name);
                    this.resetState();
                } else {
                    alert('Thêm không thành công, vui lòng thử lại sau');
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="modal fade" id="createnewPhanLoai" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm nhóm dịch vụ mới</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên nhóm</label>
                                    <input onChange={(event) => this.handleOnchanName(event)} value={this.state.infoCreate.name} type="email" className="form-control" id="exampleInputEmail1" placeholder="Tên nhóm dịch vụ" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Mô tả nhóm</label>
                                    <textarea placeholder = "Viết mô tả nhỏ hơn 255 kí tự." onChange={(event) => this.handleChangeMota(event)} value={this.state.infoCreate.mota} type="text" className="form-control" id="exampleInputPassword1" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.props.handleGetCategory} type="button" className="btn btn-secondary" data-dismiss="modal">Đóng form</button>
                            <button onClick={() => this.handleSubmitForm()} type="button" className="btn btn-primary">Thêm nhóm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(CreateServiceGroup);
