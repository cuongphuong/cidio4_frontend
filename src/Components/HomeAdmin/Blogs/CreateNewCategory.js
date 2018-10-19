import React, { Component } from 'react';
import { connect } from 'react-redux';
class CreateNewCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoCreate: {
                name: null,
                mota: null,
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
        formData.append('tentheloai', this.state.infoCreate.name);
        formData.append('mota', this.state.infoCreate.mota);

        fetch(this.props.StateInfoSystem.domain + '/api/categorys', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    alert('Thêm thành công chủ đề ' + this.state.infoCreate.name);
                    this.resetState();
                } else {
                    alert('Thêm không thành công, vui lòng thử lại sau');
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="modal fade" id="createNewCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm một chủ đề mới</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên chủ đề</label>
                                    <input onChange={(event) => this.handleOnchanName(event)} value={this.state.infoCreate.name} type="email" className="form-control" id="exampleInputEmail1" placeholder="Tên chủ đề" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Mô tả chủ đề</label>
                                    <textarea onChange={(event) => this.handleChangeMota(event)} value={this.state.infoCreate.mota} type="text" className="form-control" id="exampleInputPassword1" placeholder="Mô tả cho chủ đề" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.props.handleGetCategory} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={() => this.handleSubmitForm()} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateCategoty: state.StateCategoty, StateInfoUser: state.StateInfoUser }
})(CreateNewCategory);
