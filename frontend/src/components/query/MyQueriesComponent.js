import React from 'react';

import QueryListItemComponent from './QueryListItemComponent';

import {List} from 'antd';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const MyQueriesComponent = props => (
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => <QueryListItemComponent item={item} />}
    />
);

export default MyQueriesComponent;
