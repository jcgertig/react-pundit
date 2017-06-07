import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PunditComponent extends Component {

  static displayName = 'PunditComponent';

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
    punditModel: PropTypes.any,
  };

  passesPermissions = () => {
    const { type, action, model, user } = this.props;
    const { punditCheck, punditType, punditModel } = this.context;
    return punditCheck(type || punditType, action, model || punditModel, user);
  }

  render() {
    return null;
  }
}

export default PunditComponent;
