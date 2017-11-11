import React, { Component } from 'react';

import utils from '../services/utils';

class Rss extends Component {
    constructor(props) {
        super(props);
        let reviewedRss = utils.getRssFromStorage('reviewedRss') || {};
        let url = this.props.location.pathname;
        let rss = null;
        if(reviewedRss[url]) {
            rss = reviewedRss[url];
        }

        this.state = {
            rss: rss
        };
    }

    componentDidMount () {
        document.title = this.state.rss&&this.state.rss.title || 'Статья не найдена';
    }

    render(){
        const { rss } = this.state;

        return (
            <div className="container marginTop70">
                {rss ?
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                            <img src={rss.enclosures[0].url} className="img-responsive" />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                            <h1 className="marginTop0">{rss.title}</h1>
                            <p>{rss.description}</p>
                            <a href={rss.url} target="_blank">{rss.url}</a>
                        </div>
                    </div> :
                    <div className="row">
                        <h3 className="col-lg-12 center">Статья не найдена</h3>
                    </div>
                }
            </div>
        )
    }
}

export default Rss;