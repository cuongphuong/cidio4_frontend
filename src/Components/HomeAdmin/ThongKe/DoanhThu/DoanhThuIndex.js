import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DoanhThuIndex extends Component {

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="pg_4_title">Thống kê doanh thu</div>
                            <div><Link to='/admin/thongke/doanhthu/thang'>Thống kê doanh thu theo tháng trong năm</Link></div>
                            <div><Link to='/admin/thongke/doanhthu/nam'>Thống kê doanh thu qua các năm</Link></div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default DoanhThuIndex;