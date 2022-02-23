import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};


class spinner extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    };
}

    render() {
        return <div className="text-center">
            <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }
}

spinner.propTypes = propTypes;
spinner.defaultProps = defaultProps;
// #endregion

export default spinner;