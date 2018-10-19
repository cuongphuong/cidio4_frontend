import React, { Component } from 'react';
import TrCategory from './TrCategory';
import EditCategory from './EditCategory';
import CreateNewCategory from './CreateNewCategory';
import { connect } from 'react-redux';
class Categorys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstCategory: [],
        }
    }

    handleGetCategory() {
        var { dispatch } = this.props;
        fetch(this.props.StateInfoSystem.domain + '/api/all/categorys', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                   dispatch({
                       type: 'ADD_INDO_CATEGORY',
                       item: {...this.props.StateCategory, lstCategory : response.data}
                   });
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.handleGetCategory();
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <button type="button" data-toggle="modal" data-target="#createNewCategory" className="btn btn-info btn-fw">
                        <i className="mdi mdi-upload"></i>Tạo mới chủ đề</button>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID Chủ đề</th>
                                    <th>Tên chủ đề</th>
                                    <th>Mô tả</th>
                                    <th>Controll</th>
                                </tr>
                            </thead>
                            <tbody id="lstCategory">
                                {
                                    this.props.StateCategory.lstCategory.map((e, i) => <TrCategory handleGetCategory={this.handleGetCategory.bind(this)} id={e.id_theloai} name={e.tentheloai} mota={e.mota} key={i}></TrCategory>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <EditCategory handleGetCategory={this.handleGetCategory.bind(this)}></EditCategory>
                <CreateNewCategory handleGetCategory={this.handleGetCategory.bind(this)}></CreateNewCategory>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateCategory: state.StateCategory, StateInfoSystem: state.StateInfoSystem }
})(Categorys);
