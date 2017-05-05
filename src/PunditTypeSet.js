import React, { Component, Children } from 'react';
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
    if (Children.count(this.props.children) > 1) {
      return <span className="PunditTypeSet">{this.props.children}</span>;
    }
    return this.props.children;
  }
}

export default PunditTypeSet;
