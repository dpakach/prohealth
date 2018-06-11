import React from 'react';

import {Steps} from 'antd';

import UpdateUserProfile from './UpdateUserProfile';

const Step = Steps.Step;
class Starting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 1,
        };
    }

    inc_current = e => {
        this.setState(prevState => {
            if(0 < prevState.current  < 3){
                return {
                    current: prevState.current + 1
                }
            }
        });
    };
    render() {
        return (
            <div>
                <div className="u-margin-top-big">
                    <Steps current={this.props.current}>
                        <Step
                            title="Finished"
                            description="This is a description."
                        />
                        <Step
                            title="In Progress"
                            description="This is a description."
                        />
                        <Step
                            title="Waiting"
                            description="This is a description."
                        />
                    </Steps>
                </div>
                {
                    this.state.current && (
                        <div>
                            current = {this.state.current}
                            <button onClick={this.inc_current}>
                                next
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Starting;
