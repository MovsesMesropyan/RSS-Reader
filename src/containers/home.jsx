import React, { Component } from 'react';
import { connect } from 'react-redux';

import RssItem from './../components/rssItem';
import Spinner from './../components/spinner';

import * as  HomeActions from '../actions/home';
import utils from '../services/utils';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reviewedRss: utils.getRssFromStorage('reviewedRss') || {}
        };
    }

    componentDidMount() {
        document.title = 'RSS List';
        this.props.getRssList();
    }

    redirectTo(rss) {
        let rssUrl = rss.url&&rss.url.split('lenta.ru')[1] || null;

        if(rssUrl) {
            let reviewedRss = {...this.state.reviewedRss};
            reviewedRss[rssUrl] = rss;
            utils.setRssToStorage('reviewedRss', reviewedRss);
            this.setState({reviewedRss});
        }
    }

    render() {
        const { rssList } = this.props.home;
        const { isLoading } = this.props.main;
        const { reviewedRss } = this.state;

        let tableBody = (rssList.length > 0) ? rssList.map((rss, i) => {
            return  <RssItem
                        key={rss.url}
                        rss={rss}
                        reviewedRss={reviewedRss}
                        number={i+1}
                        redirectTo={() => this.redirectTo(rss)}/>}) :
                    <tr>
                        <td colSpan="6"><p className="center">List is empty</p></td>
                    </tr>;

        return (
            <div className="container marginTop70">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="marginRight10">RSS List</h1>
                    </div>
                    { isLoading ?
                    <Spinner />:
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Created&nbsp;at</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableBody}
                        </tbody>
                    </table>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ main, home }) => {
    return {main, home};
};

export default connect(mapStateToProps, HomeActions )(Home);