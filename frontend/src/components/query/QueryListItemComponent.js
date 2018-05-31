import React from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';

const QueryListItemComponent = (props) => (
  <List.Item actions={[<a>edit</a>, <a>more</a>]}>
    <List.Item.Meta
      avatar={<Avatar src="#" />}
      title={<Link to="/query/34">{props.item.title}</Link>}
      description="description"
    />
    <div>
        content
    </div>
  </List.Item>
)

export default QueryListItemComponent;
