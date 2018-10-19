import React, { Component } from 'react';
import { connect } from 'react-redux';
class TrCategory extends Component {
    handleUpdateState() {
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INDO_CATEGORY',
            item: {
                ...this.props.StateCategory, infoUpdate: {
                    id: this.props.id,
                    name: this.props.name,
                    mota: this.props.mota
                }
            }
        });
    }

    handleGetCategory() {
        var { dispatch } = this.props;
        fetch(this.props.StateInfoSystem.domain + '/api/all/categorys', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    dispatch({
                        type: 'ADD_INDO_CATEGORY',
                        item: { ...this.props.StateCategory, lstCategory: response.data }
                    });
                }
            })
            .catch(error => console.log(error));
    }

    handleDeleteCategory(id) {
        var result = window.confirm("Bạn có muốn xóa chủ đề " + id);
        if (result === true) {
            var formData = new FormData();
            formData.append('token', this.props.StateInfoUser.token);
            formData.append('_method', 'DELETE');
            fetch(this.props.StateInfoSystem.domain + '/api/categorys/' + id, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === true) {
                        alert('Xóa thành công');
                        this.handleGetCategory();
                    }
                    else
                        alert('Không thể xóa, vui lòng thử lại sau');
                })
                .catch(error => console.log(error));
        }
        else {

        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td> {this.props.mota}</td>
                <td>
                    <button onClick={() => this.handleUpdateState()} data-toggle="modal" data-target="#exampleModal" style={{ cursor: 'pointer', marginRight: '5px' }} className="badge badge-primary">Chỉnh sửa</button>
                    <button onClick={() => this.handleDeleteCategory(this.props.id)} style={{ cursor: 'pointer' }} className="badge badge-danger">Xoá</button>
                </td>
            </tr>
        );
    }
}

export default connect(function (state) {
    return { StateCategory: state.StateCategory, StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(TrCategory);
