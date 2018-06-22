import React from 'react';
import {Link} from 'react-router-dom';

import QueryListItemComponent from './QueryListItemComponent';

import {List, Button} from 'antd';
import {QueryUrls} from '../../constants/urls';

import {getUserInfo} from '../../utils/authUtils';
import {getQueries, apiConfig} from '../../actions/queryActions';

class MyQueriesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query_list: [],
        };
    }

    updateQueries = () => {
        getQueries()
            .then(data => {
                const queries = data.map(d => {
                    const query = d;
                    query.date_of_submission = d.date_of_submission.substr(0, 10)
                    return query
                });
                this.setState({nonFieldErrors: ''});
                this.setState({query_list: queries});
            })
            .catch(error => {
                this.setState({nonFieldErrors: error.message});
            });
    };

    componentDidMount() {
        this.updateQueries();
    }

    render() {
        return (
            <div className="section section--profile">
                <h1 className="heading heading--primary">
                    Questions you Asked
                </h1>
                <p>
                    <Link to="query/create"> Create New</Link>
                </p>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.query_list}
                    renderItem={item => (
                        <QueryListItemComponent
                            updateQueries={this.updateQueries}
                            key={item.id}
                            item={item}
                        />
                    )}
                />
            </div>
        );
    }
}

export default MyQueriesComponent;
