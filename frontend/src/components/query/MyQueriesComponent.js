import React from 'react';
import {Link} from 'react-router-dom';

import QueryListItemComponent from './QueryListItemComponent';

import {List, Icon} from 'antd';

import {getQueries} from '../../actions/queryActions';

class MyQueriesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query_list: [],
            loading: false,
        };
    }

    updateQueries = () => {
        this.setState({loading: true});
        getQueries()
            .then(data => {
                const queries = data.map(d => {
                    const query = d;
                    query.date_of_submission = d.date_of_submission.substr(
                        0,
                        10,
                    );
                    return query;
                });
                setTimeout(() => {
                    this.setState({nonFieldErrors: '', loading: false});
                    this.setState({query_list: queries});
                }, 1000);
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
                    <Link to="query/create"> Ask New Question</Link>
                </p>
                {this.state.loading && (
                    <div style={{width: '100%', textAlign: 'center'}} className="u-margin-top-small">
                        <Icon style={{fontSize: '10rem'}} type="loading" />
                    </div>
                )}
                {!this.state.loading && (
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.query_list}
                        renderItem={item => (
                            <QueryListItemComponent
                                updateQueries={this.updateQueries}
                                key={item.id}
                                item={item}
                                loading={this.state.loading}
                            />
                        )}
                    />
                )}
            </div>
        );
    }
}

export default MyQueriesComponent;
