import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as  HomeActions from '../actions/home';
import utils from '../services/utils';
import Spinner from './../components/spinner';

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
                        {(rssList.length > 0) ? rssList.map((rss, i) =>
                            <tr key={rss.url}>
                                <td>{i+1}</td>
                                <td>
                                    {rss.enclosures&&rss.enclosures[0]&&rss.enclosures[0].url ?
                                    <Link to={rss.url.split('lenta.ru')[1]} onClick={() => { this.redirectTo(rss)}} target="_blank">
                                        <img style={imgStyle} src={rss.enclosures[0].url} className="img-responsive" />
                                    </Link> :
                                    null}
                                </td>
                                <td>{rss.title}</td>
                                <td>{utils.processDate(rss.created, 'DD.MM.YYYY HH:mm')}</td>
                                <td>{reviewedRss[rss.url.split('lenta.ru')[1]] ? 'Viewed' : 'New'}</td>
                                <td>
                                    <Link to={rss.url.split('lenta.ru')[1]} onClick={() => { this.redirectTo(rss)}} target="_blank">More...</Link>
                                </td>
                            </tr>
                        ) :
                            <tr>
                                <td colSpan="6"><p className="center">List is empty</p></td>
                            </tr>}
                        </tbody>
                    </table>}
                </div>
            </div>
        )
    }
}

const imgStyle = {
    maxWidth: '100px'
};

const mapStateToProps = ({ main, home }) => {
    return {main, home};
};

export default connect(mapStateToProps, HomeActions )(Home);