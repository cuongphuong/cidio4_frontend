import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import cookie from 'react-cookies';

class RegisterService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupDisplay: 'none',
            lstPackage: [],
            page: 1,
            limit: 10,
            isChoose: false,
            isInfo: false,
            date: new Date(),
            isContinute: false
        }
    }

    onChange = date => {
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INFO_REGISTER_SERVICE',
            item: {
                ...this.props.StateInfoRegisterService,
                info: { ...this.props.StateInfoRegisterService.info, thoigian: date }
            }
        })
        console.log(this.props.StateInfoRegisterService.info.thoigian.getTimezoneOffset());
    }

    componentDidMount() {
        // console.log(this.props.StateInfoSystem.domain + '/api/get/package/' + this.state.page + '/' + this.state.limit + '?token=' + this.props.StateInfoUser.token)
        fetch(this.props.StateInfoSystem.domain + '/api/get/package/' + this.state.page + '/' + this.state.limit + '?token=' + this.props.StateInfoUser.token, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstPackage: response.data
                    })
                } else {
                    console.log('Can not get package, please try again a moment');
                }
            })
            .catch(error => '');
    }


    handleChangeDisplay() {
        this.setState({
            popupDisplay: 'none'
        });
    }

    handleChangeShowDisplay() {
        this.setState({
            popupDisplay: 'block'
        });
    }

    timeSince(date) {
        if (typeof date !== 'object') {
            date = new Date(date);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            intervalType = 'năm trước';
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                intervalType = 'tháng trước';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = 'ngày trước';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        intervalType = "giờ trước";
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            intervalType = "phút trước";
                        } else {
                            interval = seconds;
                            intervalType = "giây trước";
                        }
                    }
                }
            }
        }

        return interval + ' ' + intervalType;
    }

    onSelectedPackage(id) {
        fetch(this.props.StateInfoSystem.domain + "/api/get-detail/package/" + id + "?token=" + this.props.StateInfoUser.token, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    var { dispatch } = this.props;
                    dispatch({
                        type: 'ADD_INFO_PACKAGE',
                        item: {
                            ...this.props.StatePackage,
                            selectedDichVu: response.data.filter(i => i.id_loaidv === 1),
                            selectedDoUong: response.data.filter(i => i.id_loaidv === 2),
                            selectedDVKhac: response.data.filter(i => i.id_loaidv === 3)
                        }
                    });
                    this.setState({
                        isContinute: true,
                        popupDisplay: 'none'
                    })
                } else {
                    console.log('Can not get, please try again a moment');
                }
            })
            .catch(error => '');
    }

    b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }

    handleOnclickContinute() {
        if ((this.props.StateInfoRegisterService.info.soban >= 5 && this.props.StateInfoRegisterService.info.soban <= 100) && this.props.StateInfoRegisterService.info.diadiem.length > 2 && this.props.StateInfoRegisterService.info.thoigian > new Date()) {
            this.setState({
                isInfo: true
            });
            cookie.save('registerinfo', this.b64EncodeUnicode(JSON.stringify(this.props.StateInfoRegisterService)), { path: '/' })
        } else {
            alert('Vui lòng nhập thông tin hợp lệ.');
        }
    }

    onChangeMoTa(event) {
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INFO_REGISTER_SERVICE',
            item: {
                ...this.props.StateInfoRegisterService,
                info: { ...this.props.StateInfoRegisterService.info, mota: event.target.value }
            }
        })
    }

    onChangeDiaDiem(event) {
        var { dispatch } = this.props;
        dispatch({
            type: 'ADD_INFO_REGISTER_SERVICE',
            item: {
                ...this.props.StateInfoRegisterService,
                info: { ...this.props.StateInfoRegisterService.info, diadiem: event.target.value }
            }
        })
    }

    onChangeSoLuongBan(event) {
        var { dispatch } = this.props;
        var soban = event.target.value;
        if(soban < 5) soban = 5;
        if(soban > 100) soban = 100;
        dispatch({
            type: 'ADD_INFO_REGISTER_SERVICE',
            item: {
                ...this.props.StateInfoRegisterService,
                info: { ...this.props.StateInfoRegisterService.info, soban: soban}
            }
        })
    }

    handleBuildGoiMoi(){
        var {dispatch} = this.props;
        dispatch({
            type: 'RESET_PACKAGE'
        });
        this.setState({
            isContinute: true,
            popupDisplay: 'none'
        })
    }

    render() {
        if (this.state.isChoose === false && this.state.isInfo === true) {
            return (
                <div>
                    <div className="container">
                        <div style={{ textAlign: 'center' }}>
                            <span onClick={() => this.handleChangeShowDisplay()} className="pg_register_selectpackage pg_4_select_package">Chọn gói có sẳn</span>
                            <span onClick={() => this.handleBuildGoiMoi()} className="pg_register_selectpackage pg_4_build_new_package"><span>Tạo gói đăng kí mới</span></span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {
                                this.state.isContinute === true ?
                                    <Link to="/register/build"><button className="btn btn-primary">Tiếp tục</button></Link> :
                                    <button style={{ marginTop: '10px' }} className={(this.state.isContinute === true) ? "btn btn-primary" : "btn btn-primary disabled"}>Tiếp tục</button>
                            }
                        </div>
                    </div>

                    <div className="pg_4_popup_select_package" style={{ display: this.state.popupDisplay }}>
                        <button onClick={() => this.handleChangeDisplay()} className="btn btn-link pg_4_btn_close_popup">Đóng form này.</button>
                        <div className="pg_4_list_package_select container">
                            {
                                (this.state.lstPackage.length > 0) ? this.state.lstPackage.map((e, i) => <div key={i} className="card text-center" style={{ marginBottom: '5px' }}>
                                    <div className="card-header">
                                        {e.tengoi}
                                    </div>
                                    <div className="card-body">
                                        <button onClick={() => this.onSelectedPackage(e.id_goi)} className="btn btn-primary">Chọn gói này</button>
                                    </div>
                                    <div className="card-footer text-muted">
                                        {this.timeSince(new Date(e.created_at))}
                                    </div>
                                </div>
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <h3 style={{ paddingBottom: '10px' }} className="pg_4_title">Thông tin sự kiện</h3>
                            
                            <div className="form-group">
                                <label>Số bàn tiệt (Lớn hơn 5 và nhỏ hơn 100)</label>
                                <input onChange={this.onChangeSoLuongBan.bind(this)} value={this.props.StateInfoRegisterService.info.soban} className="form-control" style={{ marginbottom: '5px' }} type="number" min="5" max="100" placeholder="Số bàn tiệt" />
                            </div>

                            <div className="form-group">
                                <label>Địa điểm tổ chức</label>
                                <input onChange={this.onChangeDiaDiem.bind(this)} value={this.props.StateInfoRegisterService.info.diadiem} className="form-control" style={{ marginbottom: '5px' }} type="text" placeholder="Địa điểm tổ chức" />
                            </div>

                            <div className="form-group">
                                <label>Mô tả</label>
                                <input onChange={this.onChangeMoTa.bind(this)} value={this.props.StateInfoRegisterService.info.mota} className="form-control" style={{ marginBottom: '5px' }} type="text" placeholder="Mô tả" />
                            </div>

                            <div className="form-group">
                                <label>Thời gian tổ chức</label>
                                <DateTimePicker
                                    onChange={this.onChange}
                                    value={this.props.StateInfoRegisterService.info.thoigian}
                                    className="form-control"
                                    placeholder="Thời gian tổ chức"
                                    minDate={new Date()}
                                />
                            </div>
                            <button onClick={() => this.handleOnclickContinute()} className="btn btn-primary">Tiếp theo</button>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                </div>
            );
        }
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem, StatePackage: state.StatePackage, StateInfoRegisterService: state.StateInfoRegisterService }
})(RegisterService);