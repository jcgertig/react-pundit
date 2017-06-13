import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PunditComponent extends Component {

  static displayName = 'PunditComponent';

  static propTypes = {
    type: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    model: PropTypes.any,
    user: PropTypes.object,
  };

  static defaultProps = {
    type: '',
    action: '',
    method: '',
    model: undefined,
    user: null,
  };

  static contextTypes = {
    punditCheck: PropTypes.func,
    punditType: PropTypes.string,
    punditModel: PropTypes.any,
  };

  passesPermissions = () => {
    const { type, action, method, model, user } = this.props;
    const { punditCheck, punditType, punditModel } = this.context;
    return punditCheck(type || punditType, action || method, model || punditModel, user);
  }

  render() {
    return null;
  }
}

export default PunditComponent;
