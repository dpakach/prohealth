import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = () => (
    <header>
        <h1>Prohealth</h1>
        <nav>
            <NavLink to="/" exact={true}>Home    </NavLink>
            <NavLink to="/feature">Feature</NavLink>
        </nav>
    </header>
)

export default Header;
