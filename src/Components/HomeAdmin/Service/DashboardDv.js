import React, { Component } from 'react';
import CreateServiceGroup from './CreateServiceGroup';
import ListGroup from './ListGroup';
import { connect } from 'react-redux';

class DashboardDv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstPhanLoai: []
        }
    }


    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + '/api/all/sercate', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.status === true) {
                    this.setState({
                        lstPhanLoai: response.data
                    })
                } else {

                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: '10px' }} className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <button data-toggle="modal" data-target="#createnewPhanLoai" type="button" className="btn btn-primary"><i className="mdi mdi-upload"></i>Thêm nhóm mới</button>
                                {/* <span style={{ margin: 0, marginLeft: '10px' }}>Hiển thị danh sách các nhóm dịch vụ cung cấp</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {(this.state.lstPhanLoai.length > 0) ? this.state.lstPhanLoai.map((e, i) => <ListGroup key={i} phantram={e.phantram} id={e.id_loaidv} sodv={e.sodv} tenphanloai={e.tenloaidv}></ListGroup>) : ''}
                </div>
                <CreateServiceGroup></CreateServiceGroup>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoUser: state.StateInfoUser, StateInfoSystem: state.StateInfoSystem }
})(DashboardDv);


// SELECT tb_phanloai_dichvu.*, 
// (SELECT COUNT(*) FROM tb_dichvu WHERE tb_dichvu.id_loaidv = tb_phanloai_dichvu.id_loaidv) as sodv, 

// (SELECT COUNT(tb_dichvu) FROM tb_goi_dichvu inner JOIN tb_dichvu on(tb_goi_dichvu.id_dichvu = tb_dichvu.id_dichvu) WHERE tb_dichvu.id_loaidv = tb_phanloai_dichvu.id_loaidv GROUP BY (tb_dichvu.id_loaidv)) as dichvusd, 


// (SELECT COUNT(id_dichvu) FROM tb_dichvu WHERE id_dichvu IN (SELECT id_dichvu FROM tb_goi_dichvu GROUP BY(tb_goi_dichvu.id_dichvu)) AND id_loaidv = tb_phanloai_dichvu.id_loaidv) as dichvusd,


// ((SELECT COUNT(*) FROM tb_dichvu WHERE tb_dichvu.id_loaidv = tb_phanloai_dichvu.id_loaidv) /2) * 100 as phantram

// FROM tb_phanloai_dichvu