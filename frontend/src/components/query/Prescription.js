import React from 'react';

import {Link} from 'react-router-dom';
import {Card, Collapse} from 'antd';
import {getPescription} from '../../actions/queryActions';

const Panel = Collapse.Panel;

const callback = () => {
    console.log('c');
};

const text = 'medicine1; 3 times a day 2 tablets each';

const Prescription = props => (
    <Card title="Prescription" bordered={false} style={{width: '100%'}}>
        <Collapse onChange={callback}>
            {props.pescr.medicine.map(obj => {
                return (
                    <Panel header={obj.name_of_medicine} key={obj.id}>
                        <h3>{obj.name_of_medicine}</h3>
                        take {obj.quantity}, {obj.times_a_day} times a day
                        {obj.remarks && <p>note: {obj.remarks}</p>}
                    </Panel>
                );
            })}
        </Collapse>
    </Card>
);

export default Prescription;
