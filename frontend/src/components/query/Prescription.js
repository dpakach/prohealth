import React from 'react';

import QueryCta from './QueryCta';
import { Link } from 'react-router-dom';

const Prescription = props => (
    <div className="card header__card">
        <div className="card__content">
            <p>
                <span className="card__price">Your Prescription</span>
            </p>
            <ul className="card__list">
                <li className="card__list-item">Enjoy</li>
                <li className="card__list-item">Have Fun</li>
                <li className="card__list-item">Help others</li>
                <li className="card__list-item">Work Hard</li>
                <li className="card__list-item">Play hard</li>
            </ul>
            <a className="btn btn--secondary btn--card" href="#">
                View Details
            </a>
            <Link className="btn btn--primary btn--card" to="#">
                Resolve
            </Link>


            <span className="card__subheading">Appointment</span>
            <ul className="card__list">
                <li className="card__list-item">Date: 5th June, 2018</li>
                <li className="card__list-item">Venue: Fakecity General Hospital</li>
                <li className="card__list-item">Dr. John Doe, MBBS, general physician</li>
            </ul>
        </div>

    </div>
);

export default Prescription;
