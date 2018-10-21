import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstHoaDon: [],
            lstHoaDonXN: [],
            popupDisplay: 'none',
            lstMon: [],
            lstDoUong: [],
            lstKhac: [],
            infoHoaDon: null
        }
    }

    handleChangeDisplay() {

        this.setState({
            popupDisplay: 'none'
        });
    }

    resetState() {
        this.setState({
            lstMon: [],
            lstDoUong: [],
            lstKhac: [],
            infoHoaDon: null
        });
    }

    handleChangeShowDisplay(id, idhd) {
        this.resetState();
        this.fetchData(id, idhd);
        this.setState({
            popupDisplay: 'block'
        });
    }


    fetchData(id, idhodon) {
        fetch(this.props.StateInfoSystem.domain + "/api/get-detail/package/" + id + "?token=" + this.props.StateInfoUser.token, {
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




        //fetch info
        fetch(this.props.StateInfoSystem.domain + "/api/info/hoadon/" + idhodon + "?token=" + this.props.StateInfoUser.token, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        infoHoaDon: response.data
                    });
                } else {
                    console.log('Can not get, please try again a moment');
                }
            })
            .catch(error => '');
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + '/api/not-agree/hoadon?token=' + this.props.StateInfoUser.token, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstHoaDon: response.data
                    });
                }
            })
            .catch(error => console.log());



        fetch(this.props.StateInfoSystem.domain + '/api/agree/hoadon?token=' + this.props.StateInfoUser.token, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    console.log(response);
                    this.setState({

                        lstHoaDonXN: response.data
                    });
                }
            })
            .catch(error => console.log());
    }

    handleXacNhanHoadon(id_hoadon, check) {
        if (window.confirm('Xác nhận hóa đơn này không')) {
            var person = window.prompt("Nhập mã hóa đơn để xác nhận", "");

            if (person != null && parseInt(person) === parseInt(id_hoadon)) {
                fetch(this.props.StateInfoSystem.domain + '/api/change-tinh-trang/hoadon/' + id_hoadon + '?token=' + this.props.StateInfoUser.token, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.status === true) {
                            if (check === 1) {
                                var index = this.state.lstHoaDon.findIndex(i => i.id_hoadon === response.data.id_hoadon);
                                var tmpObj = [...this.state.lstHoaDon];
                                tmpObj[index].tinhtrang = response.data.tinhtrang;
                                this.setState({ lstHoaDon: tmpObj });
                            } else {
                                var index = this.state.lstHoaDonXN.findIndex(i => i.id_hoadon === response.data.id_hoadon);
                                var tmpObj = [...this.state.lstHoaDonXN];
                                tmpObj[index].tinhtrang = response.data.tinhtrang;
                                this.setState({ lstHoaDonXN: tmpObj });
                            }
                        }
                    })
                    .catch(error => console.log(error));
            } else {

            }
        }
    }

    handleCall(sdt) {
        window.open("tel:" + sdt);
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th>Khách hàng</th>
                                        <th>Điện thoại</th>
                                        <th>Giá trị</th>
                                        <th>Tình trạng</th>
                                        <th>Điều khiển</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (this.state.lstHoaDon.length > 0) ? this.state.lstHoaDon.map((e, i) => <tr key={i}>
                                            <td>{e.id_hoadon}</td>
                                            <td>{e.hoten}</td>
                                            <td><button style={{ padding: '0px' }} className="btn btn-link" onClick={() => this.handleCall(e.sodienthoai)}>{e.sodienthoai}</button></td>
                                            <td className="text-danger"> {e.tongtien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} <i className="mdi mdi-arrow-up" />
                                            </td>
                                            <td>
                                                <label className={e.tinhtrang === 1 ? "badge badge-success" : "badge badge-danger"}>{e.tinhtrang === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}</label>
                                            </td>
                                            <td>
                                                <button onClick={() => this.handleXacNhanHoadon(e.id_hoadon, 1)} style={{ padding: '0px', display: 'block' }} className="btn btn-link">{e.tinhtrang === 1 ? 'Undo xác nhận' : 'Xác nhận hóa đơn'}</button>
                                                <button onClick={() => this.handleChangeShowDisplay(e.id_goi, e.id_hoadon)} style={{ padding: '0px', display: 'block' }} className="btn btn-link">Hiển thị thực đơn chi tiết</button>
                                            </td>
                                        </tr>) : <tr></tr>
                                    }
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th>Khách hàng</th>
                                        <th>Điện thoại</th>
                                        <th>Giá trị</th>
                                        <th>Tình trạng</th>
                                        <th>Điều khiển</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (this.state.lstHoaDonXN.length > 0) ? this.state.lstHoaDonXN.map((e, i) => <tr key={i}>
                                            <td>{e.id_hoadon}</td>
                                            <td>{e.hoten}</td>
                                            <td><button style={{ padding: '0px' }} className="btn btn-link" onClick={() => this.handleCall(e.sodienthoai)}>{e.sodienthoai}</button></td>
                                            <td className="text-danger"> {e.tongtien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} <i className="mdi mdi-arrow-up" />
                                            </td>
                                            <td>
                                                <label className={parseInt(e.tinhtrang) === 1 ? "badge badge-success" : "badge badge-danger"}>{parseInt(e.tinhtrang) === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}</label>
                                            </td>
                                            <td>
                                                <button onClick={() => this.handleXacNhanHoadon(e.id_hoadon, 2)} style={{ padding: '0px', display: 'block' }} className="btn btn-link">{e.tinhtrang === 1 ? 'Undo hủy xác nhận' : 'Hủy các nhận'}</button>
                                                <button onClick={() => this.handleChangeShowDisplay(e.id_goi, e.id_hoadon)} style={{ padding: '0px', display: 'block' }} className="btn btn-link">Hiển thị thực đơn chi tiết</button>
                                            </td>
                                        </tr>) : <tr></tr>
                                    }
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>

                <div className="pg_4_popup_select_package" style={{ display: this.state.popupDisplay }}>
                    <button onClick={() => this.handleChangeDisplay()} className="btn btn-link pg_4_btn_close_popup">Đóng form này.</button>
                    <div className="pg_4_list_package_select container">
                        {/* list */}
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    this.state.infoHoaDon !== null ?
                                        <ul className="list-group" style={{ marginBottom: '10px' }}>
                                            <li className="list-group-item active waves-light">Thông tin hóa đơn</li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">{'Số bàn: ' + this.state.infoHoaDon.sobantiet}</li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">{'Nơi tổ chức: ' + this.state.infoHoaDon.diadiemtochuc}</li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">{'Ngày tổ chức: ' + this.state.infoHoaDon.ngaytochuc}</li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">{'Mô tả: ' + this.state.infoHoaDon.mota}</li>
                                        </ul>
                                        :
                                        <ul className="list-group" style={{ marginBottom: '10px' }}>
                                            <li className="list-group-item active waves-light">Thông tin hóa đơn</li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">Đang tải dữ liệu</li>
                                        </ul>
                                }
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
                        {/* /list */}
                    </div>
                </div>

            </div>

        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(ListOrder);
