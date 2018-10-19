import React, { Component } from 'react';
import ListCard from './ListCard';
import ArticleList from './ArticleList';
class Dashboard extends Component {
    render() {
        return (
            <div>
                <ListCard></ListCard>
                <ArticleList></ArticleList>

            </div>
        );
    }
}

export default Dashboard;
