import React from 'react';
import {Link} from 'react-router-dom';

const QuickLinks = props => {
    return (
        <div className="sidebar">
            <div className="sidebar__head">
                <div className="sidebar__head--icon sidebar__head--icon--notification">
                    <i className=" material-icons">notifications</i>
                    <div className="window window--notification notification-window">
                        <div className="window__head">
                            <div className="window__head--icon">
                                <i className=" material-icons">notifications</i>
                            </div>
                            <div className="window__head--text">
                                Notifications
                            </div>
                            <div className="window__head--button">
                                <a>Clear all</a>
                            </div>
                        </div>

                        <div className="window__list">
                            <div className="list-item">
                                <div className="list-item__title">Notification</div>

                                <div className="list-item__content">
                                    Ipsum dolor laboriosam reiciendis corporis
                                    nostrum. Omnis iure quas rem dolorem
                                    voluptas Iusto deleni
                                </div>

                                <div className="list-item__action">
                                    <div className="list-item__action--icon">
                                        <i className=" material-icons">
                                            notifications
                                        </i>
                                    </div>
                                    <div className="list-item__action--icon">
                                        <i className=" material-icons">
                                            thumb_up
                                        </i>
                                    </div>
                                    <div className="list-item__action--icon">
                                        <i className=" material-icons">
                                            delete
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar__head--icon">
                    <i className=" material-icons">message</i>
                </div>
            </div>

            <div className="sidebar__links">
                <Link to="/query/create" className="sidebar__link">
                    <i className="sidebar__icon icon ion-md-quote" />
                    <div className="sidebar__text">Ask A Question</div>
                </Link>
                <div className="sidebar__link">
                    <i className="sidebar__icon material-icons">
                        directions_bike
                    </i>
                    <div className="sidebar__text">Health Tips</div>
                </div>
                <div className="sidebar__link">
                    <i className="sidebar__icon icon ion-md-analytics" />
                    <div className="sidebar__text">Health Stats</div>
                </div>
                <div className="sidebar__link">
                    <i className="sidebar__icon icon ion-ios-paper-plane" />
                    <div className="sidebar__text">Contact</div>
                </div>
            </div>
        </div>
    );
};

export default QuickLinks;
