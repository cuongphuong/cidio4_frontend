import React, { Component } from 'react';
import Line from './line.jsx';
import { connect } from 'react-redux';
class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstUers: []
        }
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + '/api/users/get-page/1/5?token=' + this.props.StateInfoUser.token, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstUers: response.data
                    })
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th> User</th>
                                    <th> Họ tên</th>
                                    <th>Số điện thoại </th>
                                    <th>Giới tính</th>
                                    <th>Ngày đăng kí</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.state.lstUers.length > 0) ? this.state.lstUers.map((e, i) => <Line id={e.id} hoten={e.hoten} sodienthoai={e.sodienthoai} diachi={e.diachi} gioitinh={e.gioitinh} key={i} create={e.created_at}></Line>) :<tr></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}


export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(ListUser);
