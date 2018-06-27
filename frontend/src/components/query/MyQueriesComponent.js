import React from 'react';

import QueryListItemComponent from './QueryListItemComponent';

import {Icon} from 'antd';

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
            <div>
                <h1 className="heading heading-primary">Questions you Asked</h1>
                {this.state.loading && (
                    <div
                        style={{width: '100%', textAlign: 'center'}}
                        className="u-margin-top-small loading-icon">
                        <Icon style={{fontSize: '5rem'}} type="loading" />
                    </div>
                )}
                {!this.state.loading && (

                    <div className="query-list">
                        {this.state.query_list.map(item => (
                            <QueryListItemComponent
                                updateQueries={this.updateQueries}
                                key={item.id}
                                item={item}
                                loading={this.state.loading}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default MyQueriesComponent;
