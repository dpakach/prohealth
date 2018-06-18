import React from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const QueryListItemComponent = (props) => (
  <List.Item actions={[<a>edit</a>, <a>more</a>]}>
    <List.Item.Meta
      avatar={<Avatar src="#" />}
      title={<Link to={`query/${props.item.id}`}>{props.item.title_problem}</Link>}
      description={props.item.description}
    />
    <div>
        content
    </div>
  </List.Item>
)

export default QueryListItemComponent;
