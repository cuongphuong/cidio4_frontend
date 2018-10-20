import React, { Component } from 'react';
// import { Chart, Axis, Series, Tooltip, Cursor, Line, Bar } from "react-charts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer, Legend } from 'recharts';
import { connect } from 'react-redux';

class DoanhThu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nam: (new Date()).getFullYear(),
            optionYear: {}
        }
    }

    getOptionYear() {
        var tmp = [];
        for (var i = 2015; i <= (new Date()).getFullYear(); i++) {
            tmp = [...tmp, i];
        }
        this.setState({
            optionYear: tmp
        });
    }

    componentDidMount() {
        this.getOptionYear();
        fetch(this.props.StateInfoSystem.domain + '/api/thongke/doanhthu/thang/' + this.state.nam, {
            method: 'GET',

        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    data: response
                });
            })
            .catch(error => console.log());
    }

    handleChange = (event) => {
        this.setState({ nam: event.target.value });
    };

    render() {
        return (
            <div>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="pg_4_title">Thống kê doanh thu tháng trong năm</h3>
                            <select onChange={this.handleChange} value={this.state.nam} className="form-control" id="sel1" style={{ marginBottom: '20px' }}>
                                {
                                    (this.state.optionYear.length > 0) ? this.state.optionYear.map((e, i) => <option key={i}>{e}</option>) : <option>Trống</option>
                                }
                            </select>

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
                                        {/* <AreaChart width={600} height={200} data={this.state.data} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type='monotone' dataKey='value' stroke='#82ca9d' fill='#82ca9d' />
                                        </AreaChart> */}

                                        <LineChart width={600} height={300} data={this.state.data}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey={this.state.nam} stroke="#8884d8" activeDot={{ r: 8 }} />
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
                                                    <th>Tháng </th>
                                                    <th>Giá trị</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(this.state.data.length > 0) ? this.state.data.map((e, i) => <tr key={i} style={{ height: '10px', padding: '0' }}>
                                                    <td>{e.name}</td>
                                                    <td>{e[this.state.nam]}</td>
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
})(DoanhThu);