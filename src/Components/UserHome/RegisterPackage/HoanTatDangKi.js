import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { timingSafeEqual } from 'crypto';

class HoanTatDangKi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objHoaDon: null,
            objInfo: null
        }
    }

    componentDidMount() {
        console.log('componentWillMount');
        var tmpStatePackage = JSON.parse(this.b64DecodeUnicode(cookie.load('cidiopackage')));
        var tmpStateInfoRegister = JSON.parse(this.b64DecodeUnicode(cookie.load('registerinfo')));
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INFO_PACKAGE',
            item: tmpStatePackage
        });
        dispatch({
            type: 'ADD_INFO_REGISTER_SERVICE',
            item: tmpStateInfoRegister
        });

        this.setState({
            objInfo: tmpStateInfoRegister
        });

        //lặp

        //foreach thuc don
        var obj = {
            thucdon: [],
            douong: [],
            khac: []
        };

        tmpStatePackage.selectedDichVu.forEach(item => {
            obj = { ...obj, thucdon: [...obj.thucdon, item.id_dichvu] }
        });

        //forearch do uong
        var tmp;
        tmpStatePackage.selectedDoUong.forEach(item => {
            tmp = {
                id: item.id_dichvu,
                soluong: item.soluong
            }
            obj = { ...obj, douong: [...obj.douong, tmp] }
        });

        //forearch dich vu khac

        tmpStatePackage.selectedDVKhac.forEach(item => {
            obj = { ...obj, khac: [...obj.khac, item.id_dichvu] }
        });

        //Lấy chi tiết hóa đơn

        var formData = new FormData();
        formData.append('obj', JSON.stringify(obj));
        fetch(this.props.StateInfoSystem.domain + '/api/hoadon/gethodon', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        objHoaDon: response.data
                    });
                } else {
                    alert("Có lổi xảy ra, thử lại sau");
                }
            })
            .catch(error => '');
    }

    b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    tongTienThucDon() {
        var tongTien = 0;
        this.state.objHoaDon.thucdon.forEach(item => {
            tongTien += item.giatien
        });
        return tongTien;
    }

    tongTienDoUong() {
        var tongTien = 0;
        this.state.objHoaDon.douong.forEach(item => {
            tongTien += item.thanhtien
        });
        return tongTien;
    }

    tongTienKhac() {
        var tongTien = 0;
        this.state.objHoaDon.khac.forEach(item => {
            tongTien += item.giatien
        });
        return tongTien;
    }

    handleKetThuc(){
         //foreach thuc don
         var obj = {
            thucdon: [],
            douong: [],
            khac: []
        };

        this.props.StatePackage.selectedDichVu.forEach(item => {
            obj = { ...obj, thucdon: [...obj.thucdon, item.id_dichvu] }
        });

        //forearch do uong
        var tmp;
        this.props.StatePackage.selectedDoUong.forEach(item => {
            tmp = {
                id: item.id_dichvu,
                soluong: item.soluong
            }
            obj = { ...obj, douong: [...obj.douong, tmp] }
        });

        //forearch dich vu khac

        this.props.StatePackage.selectedDVKhac.forEach(item => {
            obj = { ...obj, khac: [...obj.khac, item.id_dichvu] }
        });

        // send tu server
        if (obj.thucdon.length >= 5) {
            var formData = new FormData();
            formData.append('token', this.props.StateInfoUser.token);
            formData.append('obj', JSON.stringify(obj));
            fetch(this.props.StateInfoSystem.domain + '/api/package', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === true) {
                        console.log(response.data)
                        var { dispatch } = this.props;
                        dispatch({ type: 'RESET_PACKAGE' });
                        dispatch({
                            type: 'ADD_INFO_REGISTER_SERVICE',
                            item: { ...this.props.StateInfoRegisterService, id_goi_dichvu: response.data.id_goi }
                        });
                        
                        this.saveHoaDon(response.data.id_goi);

                    } else {
                        alert("Có lổi xảy ra, thử lại sau");
                    }
                })
                .catch(error => '');
        } else {
            alert("Thực đơn yêu cầu không hợp lệ");
        }
    }

    saveHoaDon(idGoi){
        var formData = new FormData();
        formData.append('token', this.props.StateInfoUser.token);
        formData.append('id_goi', idGoi);
        formData.append('sobantiet', this.props.StateInfoRegisterService.info.soban);
        formData.append('ngaytochuc', this.props.StateInfoRegisterService.info.thoigian);
        formData.append('diadiemtochuc', this.props.StateInfoRegisterService.info.diadiem);
        formData.append('mota', this.props.StateInfoRegisterService.info.mota);

        fetch(this.props.StateInfoSystem.domain + '/api/hoadon', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            if(response.status === true){
                console.log(response)
            }
        })
        .catch(error => console.log(''))
    }

    render() {
        if (this.state.objHoaDon === null) {
            return (<div>Vui lòng chờ dữ liệu...</div>);
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                        <h3 style={{ paddingBottom: '10px' }} className="pg_4_title">Chi tiết hóa đơn</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr style={{ backgroundColor: '#455', color: '#fff' }}>
                                        <th scope="col">#Mã dịch vụ</th>
                                        <th scope="col">Tên dịch vụ</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Giá tiền</th>
                                        <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (this.state.objHoaDon.thucdon.length > 0) ? this.state.objHoaDon.thucdon.map((e, i) =>
                                            <tr key={i}>
                                                <th scope="row">{e.id_dichvu}</th>
                                                <td>{e.tendichvu}</td>
                                                <td>1</td>
                                                <td>{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                <td>{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                            </tr>) : ''
                                    }
                                    {this.state.objHoaDon.thucdon.length > 0 ? <tr style={{ backgroundColor: 'blue', color: '#fff' }}>
                                        <td colSpan={3}></td>
                                        <td>Tổng thực đơn</td>
                                        <td>{this.tongTienThucDon().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr> : ''}
                                    {
                                        (this.state.objHoaDon.thucdon.length > 0) ? this.state.objHoaDon.douong.map((e, i) =>
                                            <tr key={i}>
                                                <th scope="row">{e.id_dichvu}</th>
                                                <td>{e.tendichvu}</td>
                                                <td>{e.soluong}</td>
                                                <td>{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                <td>{e.thanhtien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                            </tr>) : ''
                                    }
                                    {this.state.objHoaDon.douong.length > 0 ? <tr style={{ backgroundColor: '#455', color: '#fff' }}>
                                        <td colSpan={3}></td>
                                        <td>Tổng đồ uống</td>
                                        <td>{this.tongTienDoUong().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr> : ''
                                    }

                                    {
                                        (this.state.objHoaDon.thucdon.length > 0) ? this.state.objHoaDon.khac.map((e, i) =>
                                            <tr key={i}>
                                                <th scope="row">{e.id_dichvu}</th>
                                                <td>{e.tendichvu}</td>
                                                <td>{e.soluong}</td>
                                                <td>{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                <td>{e.giatien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                            </tr>) : ''
                                    }
                                    {this.state.objHoaDon.khac.length > 0 ?
                                        <tr style={{ backgroundColor: '#455', color: '#fff' }}>
                                            <td colSpan={3}></td>
                                            <td>Tổng dịch vụ thêm khác</td>
                                            <td>{this.tongTienKhac().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                        </tr> : ''}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>{this.props.StateInfoRegisterService.info.soban} bàn</th>
                                        <td>x {this.tongTienThucDon().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} /bàn</td>
                                        <td> = {(this.props.StateInfoRegisterService.info.soban * this.tongTienThucDon()).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td>Đồ uống</td>
                                        <td>= {this.tongTienDoUong().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td>Khác</td>
                                        <td>= {this.tongTienKhac().toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>

                                    <tr style={{ backgroundColor: 'pink' }}>
                                        <th scope="row"></th>
                                        <td><b>Tổng tiền: </b></td>
                                        <td>= {((this.props.StateInfoRegisterService.info.soban * this.tongTienThucDon()) + this.tongTienDoUong() + this.tongTienKhac()).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                                <button onClick={() => this.handleKetThuc()} className="btn btn-primary">Hoàn thành đăng kí</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem, StatePackage: state.StatePackage, StateInfoRegisterService: state.StateInfoRegisterService }
})(HoanTatDangKi);