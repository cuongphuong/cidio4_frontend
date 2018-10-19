import React, { Component } from 'react';
import Card from './Card';

class ListCard extends Component {
    render() {
        return (
            <div className="row">
                <Card></Card>
                
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card"><div className="card card-statistics"><div className="card-body"><div className="clearfix"><div className="float-left"><i className="mdi mdi-receipt text-warning icon-lg" /></div><div className="float-right"><p className="mb-0 text-right">Đơn đặc hàng</p><div className="fluid-container"><h3 className="font-weight-medium text-right mb-0">1</h3></div></div></div><p className="text-muted mt-3 mb-0"><i className="mdi mdi-bookmark-outline mr-1" aria-hidden="true" /> 1 đơn đặt hàng trong tháng này</p></div></div></div><div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card"><div className="card card-statistics"><div className="card-body"><div className="clearfix"><div className="float-left"><i className="mdi mdi-package text-success icon-lg" /></div><div className="float-right"><p className="mb-0 text-right">Gói dịch vụ</p><div className="fluid-container"><h3 className="font-weight-medium text-right mb-0">5</h3></div></div></div><p className="text-muted mt-3 mb-0"><i className="mdi mdi-calendar mr-1" aria-hidden="true" /> Gói dich vụ hiện có</p></div></div></div><div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card"><div className="card card-statistics"><div className="card-body"><div className="clearfix"><div className="float-left"><i className="mdi mdi-account-location text-info icon-lg" /></div><div className="float-right"><p className="mb-0 text-right">Khách hàng</p><div className="fluid-container"><h3 className="font-weight-medium text-right mb-0">5</h3></div></div></div><p className="text-muted mt-3 mb-0"><i className="mdi mdi-reload mr-1" aria-hidden="true" /> 1 Đã mua hàng</p></div></div></div>

                </div>

        );
    }
}

export default ListCard;