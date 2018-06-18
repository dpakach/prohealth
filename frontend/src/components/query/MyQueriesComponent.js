import React from 'react';

import QueryListItemComponent from './QueryListItemComponent';

import {List} from 'antd';
import {QueryUrls} from '../../constants/urls';

import {getUserInfo} from '../../utils/authUtils';
import {getQueries, apiConfig} from '../../actions/queryActions';

class MyQueriesComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query_list: [] 
        }
    }


    componentDidMount() {
        getQueries()
            .then(data => {
                this.setState({nonFieldErrors: ''});
                this.setState({query_list: data});
            })
            .catch(error => {
                this.setState({nonFieldErrors: error.message});
            });
    }



    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.query_list}
                renderItem={item => <QueryListItemComponent item={item} />}
            />
        );
    }
}

export default MyQueriesComponent;
