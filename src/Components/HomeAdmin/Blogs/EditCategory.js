import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditCategory extends Component {

    handleOnchanName(event) {
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INDO_CATEGORY',
            item: {
                ...this.props.StateCategory, infoUpdate: {
                    ...this.props.StateCategory.infoUpdate, name: event.target.value
                }
            }
        })
    }

    handleChangeMota(event) {
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INDO_CATEGORY',
            item: {
                ...this.props.StateCategory, infoUpdate: {
                    ...this.props.StateCategory.infoUpdate, mota: event.target.value
                }
            }
        })
    }

    handleSubmitForm() {
        var formData = new FormData();
        formData.append('token', this.props.StateInfoUser.token);
        formData.append('tentheloai', this.props.StateCategory.infoUpdate.name);
        formData.append('mota', this.props.StateCategory.infoUpdate.mota);
        formData.append('_method', 'PUT');

        fetch(this.props.StateInfoSystem.domain + '/api/categorys/' + this.props.StateCategory.infoUpdate.id, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    alert('Cập nhật thành công chủ đề ' + this.props.StateCategory.infoUpdate.name);
                } else {
                    alert('Có lổi khi cập nhật, thử lại sau');
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cập nhật thông tin cho {this.props.StateCategory.infoUpdate.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên chủ đề</label>
                                    <input onChange={(event) => this.handleOnchanName(event)} value={this.props.StateCategory.infoUpdate.name} type="email" className="form-control" id="exampleInputEmail1" placeholder="Tên chủ đề" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Mô tả chủ đề</label>
                                    <textarea onChange={(event) => this.handleChangeMota(event)} value={this.props.StateCategory.infoUpdate.mota} type="text" className="form-control" id="exampleInputPassword1" placeholder="Mô tả cho chủ đề" />
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
    return { StateCategory: state.StateCategory, StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(EditCategory);
