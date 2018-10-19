import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './LstPost/Post';
import { Link } from 'react-router-dom';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstUser: [],
            lstCategory: [],
            lstPosts: [],
            page: 1,
            limit: 10,
            lstUserSelected: [],
            lstCategorySelected: []
        }
    }


    componentDidMount() {
        // fetch is get posts
        fetch(this.props.StateInfoSystem.domain + '/api/posts/getpage/' + this.state.page + '/' + this.state.limit, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstPosts: response.data
                    });
                } else {
                    console.log('Can not get, please try again a moment');
                }
            })
            .catch(error => console.log(error));

        // fetch is get users
        fetch(this.props.StateInfoSystem.domain + '/api/users/admin/get?token=' + this.props.StateInfoUser.token, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstUser: response.data
                    });
                } else {
                    console.log('Can not get, please try again a moment');
                }
            })
            .catch(error => console.log(error));

        // fetch is get categorys
        fetch(this.props.StateInfoSystem.domain + '/api/all/categorys', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    this.setState({
                        lstCategory: response.data
                    });
                } else {
                    console.log('Can not get, please try again a moment');
                }
            })
            .catch(error => console.log(error));
    }

    handleChangeUserSelected(e) {
        var index = e.nativeEvent.target.selectedIndex;
        var lstShow = this.state.lstUserSelected.filter(i => i.id !== e.target.value)
        if (index !== 0) {
            var item = {
                id: e.target.value,
                hoten: e.nativeEvent.target[index].text
            }
            this.setState({
                lstUserSelected: [...lstShow, item]
            });
        }
    }

    handleUsersClick(id) {
        alert(id)
    }

    handleDeleteFillter(){
        this.setState({
            lstUserSelected: [],
            lstCategorySelected: [],
        })
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: '10px' }} className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2">
                                        <Link to="/admin/post/editor/add/new" type="button" className="btn btn-primary btn-fw">
                                            <i class="mdi mdi-upload"></i>Đăng bài</Link>
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={() => this.handleDeleteFillter()} type="button" className="btn btn-danger btn-fw">
                                            <i className="mdi mdi-refresh"></i>Clear</button>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group row">
                                            <label style={{ paddingRight: '0px' }} className="col-sm-3 col-form-label">Users</label>
                                            <div style={{ paddingLeft: '5px' }} className="col-sm-9">
                                                <select onChange={(event) => this.handleChangeUserSelected(event)} className="form-control form-control-sm">
                                                    <option>Chọn users lọc</option>
                                                    {(this.state.lstUser.length > 0) ? this.state.lstUser.map((e, i) => <option key={i} value={e.id}>{e.hoten}</option>) : ''}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group row">
                                            <label style={{ paddingRight: '0px' }} className="col-sm-3 col-form-label">Category</label>
                                            <div style={{ paddingLeft: '5px' }} className="col-sm-9">
                                                <select onChange={(event) => this.handleChangeUserSelected(event)} className="form-control form-control-sm">
                                                    <option>Chọn chuyển mục lọc</option>
                                                    {(this.state.lstCategory.length > 0) ? this.state.lstCategory.map((e, i) => <option key={i} value={e.id_theloai}>{e.tentheloai}</option>) : ''}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-ticked">
                                    {
                                        (this.state.lstUserSelected.length > 0) ? this.state.lstUserSelected.map((e, i) => <label onClick={() => this.handleUsersClick(e.id)} key={i} style={{ marginRight: '5px' }} className="badge badge-warning"> {e.hoten} </label>) : ''
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Danh sách bài viết</h5>
                                <div className="fluid-container">
                                    {
                                        this.state.lstPosts.map((e, i) => <Post tentheloai={e.tentheloai} avatar={e.avatar} tenthanhvien={e.tenthanhvien} user={e.id_user} datepost={e.created_at} dateupdate={e.updated_at} id={e.id_baiviet} title={e.tieude} noidung={e.noidung} key={i}></Post>)
                                    }
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
})(Posts);
