import React, { Component } from 'react';
import ListCard from '../Dashboard/ListCard';
import DoanhThuIndex from './DoanhThu/DoanhThuIndex';
import DatePicker from 'react-date-picker';

class ThongKeTongQuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    onChange = date => this.setState({ date })


    getDate

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

                                <ul className="list-group" style={{marginTop: '20px'}}>
                                    <li className="list-group-item active">Danh sách đơn hàng trong ngày {this.state.date !== '' ? this.state.date.getDate() + "/" + this.state.date.getMonth() : ''}</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Morbi leo risus</li>
                                    <li className="list-group-item">Porta ac consectetur ac</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
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

export default ThongKeTongQuan;