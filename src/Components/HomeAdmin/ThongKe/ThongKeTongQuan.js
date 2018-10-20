import React, { Component } from 'react';
import ListCard from '../Dashboard/ListCard';
import DoanhThuIndex from './DoanhThu/DoanhThuIndex';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

class ThongKeTongQuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lstDonHangXapToi: []
        }
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + '/api/thongke/donhangxaptoi', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    lstDonHangXapToi: response
                });
            })
            .catch(error => console.log());
    }

    onChange = date => this.setState({ date })



    render() {
        return (
            <div>
                <ListCard></ListCard>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="pg_4_title">Đơn hàng xắp tới</div>
                                <DatePicker
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />

                                <ul className="list-group" style={{ marginTop: '20px' }}>
                                    <li className="list-group-item active">Danh sách đơn hàng trong ngày {this.state.date !== '' ? this.state.date.getDate() + "/" + this.state.date.getMonth() : ''}</li>
                                    {
                                        (this.state.lstDonHangXapToi.length > 0) ? this.state.lstDonHangXapToi.map((e, i) => <li className="list-group-item">abc</li>) : <li className="list-group-item">Không có đơn nào</li>
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <DoanhThuIndex></DoanhThuIndex>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(ThongKeTongQuan);