import React, { Component } from 'react';
import Card from './Card';
import { connect } from 'react-redux';

class ListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstTT: {
                "doanhthu": { "tong": 0, "thang": 0 },
                "donhang": { "tong": 0, "thang": 0 },
                "users": { "tong": 0, "thang": 0 },
                "goi": { "tong": 0 }
            }
        }
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + '/api/thongke/coban', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    lstTT: response
                });
            })
            .catch(error => console.log());
    }

    render() {
        return (
            <div className="row">
                <Card icon='mdi-cube' title="Tổng doanh thu" value={this.state.lstTT.doanhthu.tong} description={this.state.lstTT.doanhthu.thang + ' doanh thu trong tháng'} ></Card>
                <Card icon='mdi-receipt' title="Tổng đơn hàng" value={this.state.lstTT.donhang.tong} description={this.state.lstTT.donhang.thang + ' đơn hàng trong tháng'} ></Card>
                <Card icon='mdi-bookmark-outline' title="Tổng gói" value={this.state.lstTT.goi.tong} description={'Số gói'} ></Card>
                <Card icon='mdi-account-location' title="Tổng thành viên" value={this.state.lstTT.users.tong} description={this.state.lstTT.users.thang + ' đăng kí gần đây'} ></Card>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem }
})(ListCard);