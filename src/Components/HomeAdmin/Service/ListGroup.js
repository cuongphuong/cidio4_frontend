import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListGroup extends Component {
    render() {
        return (
            <div className="col-lg-4 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-5"><Link to={"/admin/service/group/" + this.props.id}>{this.props.tenphanloai}</Link></h2>
                        <div className="wrapper d-flex justify-content-between">
                            <div className="side-left">
                                <p className="mb-2">Tổng dịch vụ trong nhóm</p>
                                <p className="display-3 mb-4 font-weight-light">+ {this.props.sodv}</p>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="d-flex justify-content-between">
                                <p className="mb-2">Được sử dụng</p>
                                <p className="mb-2 text-primary">{this.props.phantram + "%"}</p>
                            </div>
                            <div className="progress">
                                <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: this.props.phantram + '%' }} aria-valuenow={this.props.phantram} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListGroup;
