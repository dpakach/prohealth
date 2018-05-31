export const setTitle = title => WrappedComponent => {
    return class extends React.Component {
        componentDidMount() {
            document.title = title;
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};
