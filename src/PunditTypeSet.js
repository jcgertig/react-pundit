import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class PunditTypeSet extends Component {

  static displayName = 'PunditTypeSet';

  static propTypes = {
    type: PropTypes.string,
    model: PropTypes.any,
    children: PropTypes.any,
  };

  static defaultProps = {
    type: '',
    model: null,
    user: null,
  };

  static childContextTypes = {
    punditType: PropTypes.string,
    punditModel: PropTypes.any,
  };

  getChildContext() {
    return { punditType: this.props.type, punditModel: this.props.model };
  }

  render() {
    if (Children.count(this.props.children) > 1) {
      return <span className="PunditTypeSet">{this.props.children}</span>;
    }
    return this.props.children;
  }
}

export default PunditTypeSet;
