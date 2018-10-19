import React, { Component } from 'react';
import Item from './item';
import { connect } from 'react-redux';
import NewService from './NewService';

class GroupDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstDV: [],
            infoPhanLoai: {
                mota: null
            },
        }
    }

    getList() {
        fetch(this.props.StateInfoSystem.domain + '/api/service/getsercate/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstDV: response.data
                    })
                }
            })
            .catch(error => console.log(error));


        fetch(this.props.StateInfoSystem.domain + '/api/sercate/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        infoPhanLoai: response.data
                    })
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <div>
                <NewService getList={() => this.getList()} idPhanLoai={this.props.match.params.id}></NewService>
                <div style={{ marginBottom: '10px' }} className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <button data-toggle="modal" data-target="#createNewService" type="button" className="btn btn-primary"><i className="mdi mdi-upload"></i>Thêm mới</button>
                                <span style={{ margin: 0, marginLeft: '10px' }}>{(this.state.infoPhanLoai.mota != null) ? this.state.infoPhanLoai.mota : 'Loadding...'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="pg_container_card">
                            <ul className="pg_content_list_card">
                                {
                                    (this.state.lstDV.length > 0) ? this.state.lstDV.map((e, i) => <Item key={i} getList={() => this.getList()} id={e.id_dichvu} demo={e.demo} tendichvu={e.tendichvu} mota={e.mota}></Item>) : ''
                                }
                            </ul>
                            {/* <div style={{ 'textAlign': 'center' }}>{(this.props.StateToggleView.toggleButtonLoadmore === false) ? <button onClick={this.loadmoreData.bind()} className="btn btn-link">Xem thêm còn nhiều lắm </button> : <img height="50px" src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-10.gif" alt="loadmore" />}</div> */}
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(GroupDetail);
