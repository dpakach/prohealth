import React from 'react';

class FeaturePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'value'
        };
    }

    render() {
        return (
            <div>
                <p>{this.state.key}</p>
            </div>
        );
    }
}

export default FeaturePage;
