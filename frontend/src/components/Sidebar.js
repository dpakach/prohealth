import React from 'react';
import {Link} from 'react-router-dom';

import FaBeer from 'react-icons/lib/fa/beer';

const QuickLinks = props => {
    return (
        <div className="sidebar">
            <div className="sidebar__link">
                <i className="sidebar__icon icon ion-md-quote"></i>
                <Link  to="/query/create" className="sidebar__text">Ask A Question</Link>
            </div>
            <div className="sidebar__link">
                <i className="sidebar__icon material-icons">directions_bike</i>
                <div className="sidebar__text">Health Tips</div>
            </div>
            <div className="sidebar__link">
                <i className="sidebar__icon icon ion-md-analytics"></i>
                <div className="sidebar__text">Health Stats</div>
            </div>
            <div className="sidebar__link">
                <i className="sidebar__icon icon ion-ios-paper-plane"></i>
                <div className="sidebar__text">Contact</div>
            </div>
        </div>
    );
};

export default QuickLinks;
