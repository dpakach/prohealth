import React from 'react';

import Prescription from './Prescription';

const QueryHeader = props => (
    <div>
        <div className="header__text-box">
            <div className="header__text header__text--main">
                Amet voluptatem aliquam consectetur
            </div>
            <div className="header__text header__text--sub">
                Lorem aut quaerat consectetur accusamus dolore. Atque assumenda
                expedita nesciunt quasi impedit temporibus S
                    Elit in id aperiam ullam quisquam. Voluptate aperiam reprehenderit eum voluptates cumque Totam tempore omnis repudiandae perspiciatis earum voluptates? Reiciendis laudantium dignissimos necessitatibus in earum Optio illum maiores blanditiis dolores
                
                <div className="header__text--small">
                    created by Daniel Fakeman
                    <br />
                    last updated 17 june
                </div>
            </div>
        </div>

        <Prescription />
    </div>
);

export default QueryHeader;
