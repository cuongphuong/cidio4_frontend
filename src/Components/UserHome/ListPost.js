import React, { Component } from 'react';
import Item from './ItemPost/Item';
import { connect } from 'react-redux';

class ListPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleButtonLoadmore: false,
            lstBaiViet: []
        }
    }

    loadmoreData = () => {
        this.setState({
            toggleButtonLoadmore: !this.state.toggleButtonLoadmore
        })
    }

    componentDidMount() {
        fetch(this.props.StateInfoSystem.domain + "/api/posts/getcate/" + this.props.match.params.id + "/1/10", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.status === true){
                    this.setState({
                        lstBaiViet: response.data
                    });
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="pg_4_view_breadcrumb">
                    <div className="container">
                        <h1>Chủ đề bài viết</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Library</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Data</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="pg_container_card">
                        <ul className="pg_content_list_card">
                            {
                                this.state.lstBaiViet.length > 0 ? this.state.lstBaiViet.map((e, i) => <Item idPost={1} images={'e.img'} title={e.tieude} description={e.noidung} timepost={e.created_at} key={i}></Item>) : ''
                            }
                        </ul>
                        <div style={{ 'textAlign': 'center' }}>{(this.state.toggleButtonLoadmore === false) ? <button onClick={this.loadmoreData.bind()} className="btn btn-link">Xem thêm còn nhiều lắm </button> : <img height="50px" src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-10.gif" alt="loadmore" />}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return { StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(ListPost);