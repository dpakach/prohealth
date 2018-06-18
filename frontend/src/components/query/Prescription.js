import React from 'react';

import {Link} from 'react-router-dom';
import {Card, Collapse} from 'antd';
const Panel = Collapse.Panel;

const callback = () => {
    console.log('c');
};

const text = 'medicine1; 3 times a day 2 tablets each';

const Prescription = props => (
    <Card title="Prescription" bordered={false} style={{width: '100%'}}>
        <Collapse onChange={callback}>
            <Panel header="med1" key="1">
                <p>{text}</p>
            </Panel>
            <Panel header="med2" key="2">
                <p>{text}</p>
            </Panel>
            <Panel header="med3" key="3">
                <p>{text}</p>
            </Panel>
        </Collapse>
    </Card>
);

export default Prescription;
