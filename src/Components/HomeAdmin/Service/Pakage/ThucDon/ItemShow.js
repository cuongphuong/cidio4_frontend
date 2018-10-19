import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextTruncate from 'react-text-truncate';

class ItemShow extends Component {

    handleAdd(phanLoai, id) {
        var { dispatch } = this.props;
        if (phanLoai === 1) {
            dispatch({
                type: 'ADD_ITEM_TO_ORDER',
                item: id
            });
        } else if (phanLoai === 2) {
            dispatch({
                type: 'ADD_ITEM_TO_DOUONG',
                item: id
            });
        } else {
            dispatch({
                type: 'ADD_ITEM_IN_DVKHAC',
                item: id
            });
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
                            text={this.props.mota}
                            line={2}
                            truncateText="…"
                        />
                    </span>
                    <span>{this.props.giatien} <font style={{ color: "#000" }}> đ</font></span>
                </div>
                <button onClick={() => this.handleAdd(this.props.phanLoai, this.props.id)} type="button" className="btn btn-success btn-fw">
                    <i className="mdi mdi-check"></i>
                </button>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StatePackage: state.StatePackage }
})(ItemShow);
