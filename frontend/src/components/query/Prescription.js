import React from 'react';

import {Link} from 'react-router-dom';
import {Card, Collapse, List} from 'antd';
import {getPescription} from '../../actions/queryActions';

const Prescription = props => (
    <div>
        <List
            size="small"
            header={<h2>Header</h2>}
            bordered
            dataSource={props.medicine}
            renderItem={item => (
                <List.Item>
                    <h3>{item.name_of_medicine}</h3>
                    <br />
                    <p>
                        take {item.quantity}, {item.times_a_day} times a day
                        note: {item.remarks}
                    </p>
                </List.Item>
            )}
        />
    </div>
);

export default Prescription;
