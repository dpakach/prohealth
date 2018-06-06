import React from 'react';

const Prescription = props => (
    <div class="card header__card">
        <div class="card__content">
            <p>
                <span class="card__price">Your Prescription</span>
            </p>
            <ul class="card__list">
                <li class="card__list-item">Enjoy</li>
                <li class="card__list-item">Have Fun</li>
                <li class="card__list-item">Help others</li>
                <li class="card__list-item">Work Hard</li>
                <li class="card__list-item">Play hard</li>
            </ul>
            <a class="btn btn--secondary btn--card" href="#">
                View Details
            </a>
            <a class="btn btn--primary btn--card" href="#">
                Resolve
            </a>
        </div>
    </div>
);

export default Prescription;
