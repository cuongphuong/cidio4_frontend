import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer, Legend } from 'recharts';

class DonHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            type: 'year',
            tunam: (new Date()).getFullYear() - 1,
            dennam: (new Date()).getFullYear(),
            optionYear: {},
            optionYearSau: {}, 
            objYear: []
        }
    }

    getOptionYear() {
        var tmp = [];
        for (var i = 2015; i < (new Date()).getFullYear(); i++) {
            tmp = [...tmp, i];
        }
        this.setState({
            optionYear: tmp
        });

        for (var i = (new Date()).getFullYear() - 1; i <= (new Date()).getFullYear(); i++) {
            tmp = [...tmp, i];
        }
        this.setState({
            optionYearSau: tmp
        });
    }

    setStateNone(){
        this.setState({
            data : []
        })
    }

    componentDidMount() {
        this.getOptionYear();
        // this.handleLoadData(this.state.tunam, this.state.dennam);
    }

    handleChange = (event) => {
        this.setState({ tunam: event.target.value });
        var tmp = [];
        for (var i = parseInt(event.target.value) + 1; i <= (new Date()).getFullYear(); i++) {
            tmp = [...tmp, i];
        }
        this.setState({
            optionYearSau: tmp
        });

        this.fetchDataByYear(parseInt(event.target.value), this.state.dennam);
    };

    handleChangeNamSau = (event) => {
        this.setState({ dennam: event.target.value });
        this.fetchDataByYear(this.state.tunam, parseInt(event.target.value));
    };


    fetchDataByYear(tunam, dennam) {
        this.setStateNone();
        fetch(this.props.StateInfoSystem.domain + '/api/thongke/donhang/nam/' + tunam + "/" + dennam, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({
                    data: response
                });
            })
            .catch(error => console.log());
    }

    fetchDataByMonth(obj) {
        this.setStateNone();
        fetch(this.props.StateInfoSystem.domain + '/api/thongke/donhang/thang/' + JSON.stringify(obj), {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({
                    data: response
                });
            })
            .catch(error => console.log());
    }

    handleChangeType = (event) => {
        this.setState({ type: event.target.value });
    }

    handleAddYear(){
        var tmp = [...this.state.objYear, this.refs.inputyear.value];
        this.setState({objYear : [...this.state.objYear, this.refs.inputyear.value]})
       
        this.fetchDataByMonth(tmp);
    }

    render() {
        return (
            <div>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="pg_4_title">Thống kê đơn hàng</h3>
                            <select onChange={this.handleChangeType} value={this.state.type} className="form-control" id="sel1" style={{ marginBottom: '20px' }}>
                                <option value='year'>Theo năm</option>
                                <option value='month'>Theo tháng</option>
                            </select>

                            {/* // */}
                            {
                                this.state.type === 'year' ?
                                    <div className="row">
                                        <div className="col-md-3">
                                            Từ năm:
                                    <select onChange={this.handleChange} value={this.state.tunam} className="form-control" id="sel1" style={{ marginBottom: '20px' }}>
                                                {
                                                    (this.state.optionYear.length > 0) ? this.state.optionYear.map((e, i) => <option key={i}>{e}</option>) : <option>Trống</option>
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            Đến năm:
                                    <select onChange={this.handleChangeNamSau} value={this.state.dennam} className="form-control" id="sel1" style={{ marginBottom: '20px' }}>
                                                {
                                                    (this.state.optionYearSau.length > 0) ? this.state.optionYearSau.map((e, i) => <option key={i}>{e}</option>) : <option>Trống</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <div><input ref="inputyear" type="number" className="form-control" placeholder="input year"></input>
                                    <button onClick={() => this.handleAddYear()} className="btn btn-primary">Thêm</button></div>
                            }


                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Biểu đồ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Bảng dữ liệu</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    {/* ---------- */}
                                    {this.state.data.length > 0 ? <ResponsiveContainer width='95%' aspect={4.0 / 2}>

                                        <LineChart width={600} height={300} data={this.state.data}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            {
                                                this.state.objYear.length > 0 ? this.state.objYear.map((e, i) => <Line key={i} type="monotone" dataKey={e} stroke="#8884d8" activeDot={{ r: 8 }} />) : ''
                                            }
                                            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                        </LineChart>
                                    </ResponsiveContainer>
                                        : ''}
                                    {/* ---------- */}
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    {/* ----------- */}
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Tháng/Năm </th>
                                                    <th>Giá trị</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(this.state.data.length > 0) ? this.state.data.map((e, i) => <tr key={i} style={{ height: '10px', padding: '0' }}>
                                                    <td>{e.name}</td>
                                                    <td>{e['Đơn hàng']}</td>
                                                </tr>)
                                                    : <tr></tr>}

                                            </tbody>
                                        </table>
                                    </div>


                                    {/* ----------- */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(DonHang);