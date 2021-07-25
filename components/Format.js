import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Format extends Component {
  render() {
    const { formatter, children } = this.props;
    return (
      <>
        { formatter(children) }
      </>
    );
  };
}

Format.propTypes = {
  formatter: PropTypes.func.isRequired
}

export default Format;