import React, { Component } from 'react';
import Item from './ItemPost/Item';

class ListPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleButtonLoadmore: false
        }
    }

    loadmoreData = () => {
        this.setState({
            toggleButtonLoadmore: !this.state.toggleButtonLoadmore
        })
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
                            <Item idPost={1} images={'e.img'} title={'e.name'} description={'e.description'} timepost={'e.time'} key={'i'}></Item>
                            <Item idPost={1} images={'e.img'} title={'e.name'} description={'e.description'} timepost={'e.time'} key={'i'}></Item>
                            <Item idPost={1} images={'e.img'} title={'e.name'} description={'e.description'} timepost={'e.time'} key={'i'}></Item>
                            <Item idPost={1} images={'e.img'} title={'e.name'} description={'e.description'} timepost={'e.time'} key={'i'}></Item>
                            <Item idPost={1} images={'e.img'} title={'e.name'} description={'e.description'} timepost={'e.time'} key={'i'}></Item>
                        </ul>
                        <div style={{ 'textAlign': 'center' }}>{(this.state.toggleButtonLoadmore === false) ? <button onClick={this.loadmoreData.bind()} className="btn btn-link">Xem thêm còn nhiều lắm </button> : <img height="50px" src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-10.gif" alt="loadmore" />}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListPost;