import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ListPackage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lstPackage: [],
            page: 1,
            limit: 10,
        }
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

    render() {
        return (
            <div>
                {/* <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Chọn hóa đơn theo user</label>
                    <select style={{ borderRadius: '20px' }} className="form-control" id="exampleFormControlSelect2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <input className="form-control" placeholder="Nhap" autocomplete="on"></input>
                </div> */}
                <div className="list-group">
                    {
                        (this.state.lstPackage.length > 0) ? this.state.lstPackage.map((e, i) => <Link key={i} to={"/admin/service/package/lst/" + e.id_goi} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{e.tengoi}</h5>
                                <small>{this.timeSince(new Date(e.created_at))}</small>
                            </div>
                            <p className="mb-1">Gồm {e.soluongdv} item trong gói</p>
                            <small>Tông tiền: {e.tongtien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</small>
                        </Link>) : ''
                    }
                </div>


            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(ListPackage);