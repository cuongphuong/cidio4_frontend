import React, { Component } from 'react';
import { connect } from 'react-redux';

class DetailPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstMon: [],
            lstDoUong: [],
            lstKhac: []
        }
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + "/api/get-detail/package/" + this.props.match.params.id + "?token=" + this.props.StateInfoUser.token, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstMon: response.data.filter(i => i.id_loaidv === 1),
                        lstDoUong: response.data.filter(i => i.id_loaidv === 2),
                        lstKhac: response.data.filter(i => i.id_loaidv === 3)
                    })
                } else {
                    console.log('Can not get, please try again a moment');
                }
            })
            .catch(error => '');
    }

    handleDeletePackage() {
        var check = window.confirm("Bạn có muốn xóa gói này không?");
        if (check === true) {
            var formData = new FormData();
            formData.append('token', this.props.StateInfoUser.token);
            formData.append('_method', 'DELETE');
            fetch(this.props.StateInfoSystem.domain + "/api/package/" + this.props.match.params.id, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === true) {
                        alert(response.message);
                        window.location = "/admin/service/package/lst";
                    } else {
                        alert(response.message + ', Vui lòng thử lại sau');
                    }
                })
                .catch(error => '');
        } else {

        }
    }
    render() {
        return (
            <div>
                <div style={{ marginBottom: '10px' }} className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <button onClick={() => this.handleDeletePackage()} type="button" className="btn btn-danger btn-fw">
                                    <i className="mdi mdi-refresh"></i>Xóa gói</button>
                                {/* <span style={{ margin: 0, marginLeft: '10px' }}>Hiển thị danh sách các nhóm dịch vụ cung cấp</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item active waves-light">Thực đơn</li>
                            {
                                (this.state.lstMon.length > 0) ? this.state.lstMon.map((e, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    {'id :[' + e.id_dichvu + '] ' + e.tendichvu}
                                    <span className="badge badge-primary badge-pill">{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                </li>) : ''
                            }
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item active waves-light">Đồ uống</li>

                            {
                                (this.state.lstDoUong.length > 0) ? this.state.lstDoUong.map((e, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    {'id :[' + e.id_dichvu + '] ' + e.tendichvu}
                                    <span style={{ display: 'block' }} className="badge badge-primary badge-pill">{"SL: " + e.soluong}</span>
                                    <span style={{ display: 'block' }} className="badge badge-primary badge-pill">{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                </li>) : ''
                            }
                        </ul>

                    </div>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item active waves-light">Dịch vụ khác</li>
                            {
                                (this.state.lstKhac.length > 0) ? this.state.lstKhac.map((e, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    {'id :[' + e.id_dichvu + '] ' + e.tendichvu}
                                    <span className="badge badge-primary badge-pill">{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                </li>) : ''
                            }
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}
export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(DetailPackage);