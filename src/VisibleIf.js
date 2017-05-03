import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VisibleIf extends Component {

  static displayName = 'VisibleIf';

  static propTypes = {
    type: PropTypes.string,
    action: PropTypes.string,
    model: PropTypes.object,
    user: PropTypes.object,
    children: PropTypes.any,
  };

  static defaultProps = {
    type: '',
    action: '',
    model: {},
    user: null,
  };

  static contextTypes = {
    punditCheck: PropTypes.func,
    punditType: PropTypes.string,
  };

  render() {
    const { type, action, model, user, children } = this.props;
    const { punditCheck, punditType } = this.context;
    if (punditCheck(type || punditType, action, model, user)) {
      return children;
    }
    return null;
  }
}

export default VisibleIf;
