import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextTruncate from 'react-text-truncate';
import renderHTML from 'react-render-html';

class ItemOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soluong: 1,
            icon: '<i className="mdi mdi-refresh"></i>'
        }
    }


    handleAdd(phanLoai, id) {
        var { dispatch } = this.props;
        if (phanLoai === 1) {
            dispatch({
                type: 'REMOVE_ITEM_TO_ORDER',
                item: id
            })
        } else if (phanLoai === 2) {
            dispatch({
                type: 'REMOVE_ITEM_TO_DOUONG',
                item: id
            })
        } else {
            dispatch({
                type: 'REMOVE_ITEM_IN_DVKHAC',
                item: id
            })
        }
    }

    handleOnChanSoLuong(event, id) {
        if (event.target.value > 0 && event.target.value < 500) {
            this.setState({
                soluong: event.target.value
            })
        } else {
            if (event.target.value < 0) {
                this.setState({
                    soluong: 1
                })
            }
            if (event.target.value > 500) {
                this.setState({
                    soluong: 500
                })
            }
        }
    }

    handleUpdateSouong(event, id) {
        if (event.key === 'Enter') {
            var data = {
                id: id,
                soluong: this.state.soluong
            }
            var { dispatch } = this.props;
            dispatch({
                type: 'UPDATE_SOLUONG',
                item: data
            })
            this.setState({
                icon: '<img class="pg_4_imgload" alt="icon" width="12px" height="12px" src="https://loading.io/spinners/reload/lg.ajax-syncing-loading-icon.gif"/>'
            })
            setTimeout(function () {
                this.setState({
                    icon: '<i className="mdi mdi-refresh"></i>'
                })
            }.bind(this), 1000);
        }
    }

    render() {
        return (
            <div className="pg_4_card">
                <div style={{ backgroundImage: 'url(\'' + this.props.demo + '\')' }} className="pg_4_img">

                </div>
                <div className="pg_4_info">
                    <span>{this.props.name}</span>
                    <span>
                        <TextTruncate
                            line={2}
                            truncateText="…"
                            text={this.props.mota}
                        />
                    </span>
                    <span>{this.props.giatien} <font style={{ color: "#000" }}> đ</font></span>
                </div>

                {
                    this.props.phanLoai === 2 ? <div className="pg_4_soluong">
                        <input value={this.state.soluong} onKeyPress={(event) => this.handleUpdateSouong(event, this.props.id)} onChange={(event) => this.handleOnChanSoLuong(event, this.props.id)} type="number" className="form-control" placeholder="Nhập số lượng(mặt định: 1)" aria-label="Username" aria-describedby="colored-addon2" />
                    </div> : ''
                }

                <button onClick={() => this.handleAdd(this.props.phanLoai, this.props.id)} type="button" className="btn btn-outline-danger btn-fw pg_4_btnremove">
                    {renderHTML(this.state.icon)}
                </button>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StatePackage: state.StatePackage }
})(ItemOrder);
