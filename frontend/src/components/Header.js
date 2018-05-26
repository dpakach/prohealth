import React from 'react';
import {NavLink} from 'react-router-dom';

import { Menu } from 'antd';


class Header extends React.Component {
    render(){
        return (
            <header>
                <Menu
                    mode="horizontal"
                >
                    <Menu.Item>
                        <p>ProHealth</p>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to="/" exact={true}>Home</NavLink>
                    </Menu.Item>
                
                    <Menu.Item>
                        <NavLink to="/feature">Feature</NavLink>
                    </Menu.Item>
                </Menu>
            </header>
        )
    }

} 

export default Header;
