import React, { Component } from 'react';
import ListCard from './ListCard';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import Post from '../Blogs/LstPost/Post';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lstPosts: [],
            page: 1,
            limit: 10,
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
    }

    render() {
        return (
            <div>
                <ListCard></ListCard>
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
})(Dashboard);