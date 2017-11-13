import React from 'react';

import utils from '../services/utils';

const RssView = (props) => {
    const reviewedRss = utils.getRssFromStorage('reviewedRss') || {};
    const url = props.location&&props.location.pathname || '';
    let rss = null;

    if(reviewedRss[url]) {
        rss = reviewedRss[url];
    }

    document.title = rss&&rss.title || 'Статья не найдена';

    return (
        <div className="container marginTop70">
            {rss ?
            <div className="row">
                {rss.enclosures&&rss.enclosures[0]&&rss.enclosures[0].url ?
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                        <img src={rss.enclosures[0].url} className="img-responsive" />
                    </div> :
                    null}
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
};

export default RssView;