import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import utils from '../services/utils';

const RssItem = ({rss, reviewedRss, number, redirectTo}) => {

    const imgStyle = {
        maxWidth: '100px'
    };

    return (
        <tr>
            <td>{number}</td>
            <td>
                {rss.enclosures&&rss.enclosures[0]&&rss.enclosures[0].url ?
                    <Link to={rss.url.split('lenta.ru')[1]} onClick={redirectTo} target="_blank">
                        <img style={imgStyle} src={rss.enclosures[0].url} className="img-responsive" />
                    </Link> :
                    null}
            </td>
            <td>{rss.title}</td>
            <td>{utils.processDate(rss.created, 'DD.MM.YYYY HH:mm')}</td>
            <td>{reviewedRss[rss.url.split('lenta.ru')[1]] ? 'Viewed' : 'New'}</td>
            <td>
                <Link to={rss.url.split('lenta.ru')[1]} onClick={redirectTo} target="_blank">More...</Link>
            </td>
        </tr>
    )
};

RssItem.propTypes = {
    rss: PropTypes.object.isRequired,
    reviewedRss: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    redirectTo: PropTypes.func.isRequired
};

export default RssItem;