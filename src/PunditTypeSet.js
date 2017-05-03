import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PunditTypeSet extends Component {

  static displayName = 'PunditTypeSet';

  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
  };

  static defaultProps = {
    type: '',
    user: null,
  };

  static childContextTypes = {
    punditType: PropTypes.string,
  };

  getChildContext() {
    return { punditType: this.props.type };
  }

  render() {
    return this.props.children;
  }
}

export default PunditTypeSet;
