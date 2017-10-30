import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';

class VisibleIf extends PunditComponent {
  static displayName = 'VisibleIf';

  render() {
    if (this.passesPermissions()) {
      return this.props.children;
    }
    return null;
  }
}

export default VisibleIf;
