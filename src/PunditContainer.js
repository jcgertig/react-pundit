import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash.isplainobject';

import PunditPolicy from './PunditPolicy';

const has = (obj, key) => obj.hasOwnProperty(key);

class PunditContainer extends Component {

  static displayName = 'PunditContainer';

  static propTypes = {
    policies: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    user: PropTypes.object,
    element: PropTypes.any,
  };

  static defaultProps = {
    policies: {},
    user: null,
    element: 'div',
  };

  static childContextTypes = {
    punditCheck: PropTypes.func,
  };

  getChildContext() {
    const punditCheck = (type, action, model = null, user = null) => {
      const { policies } = this.props;
      let policy;
      if (Array.isArray(policies)) {
        const index = policies.map(policy =>  policy.modelType).indexOf(type);
        if (index < 0) { return false; }
        policy = policies[index];
      } else {
        if (!has(policies, type)) { return false; }
        policy = policies[type];
      }
      if (typeof policy === 'function' && !(policy instanceof PunditPolicy)) {
        return policy.apply(null, [action, model, user || this.props.user]);
      } else if (isObject(policy)) {
        if (!has(policy, action)) { return false; }
        return policy[action].apply(null, [model, user || this.props.user]);
      } else if (policy instanceof PunditPolicy) {
        if (typeof policy[action] !== 'function') { return false; }
        return policy[action].apply(null, [model, user || this.props.user]);
      }
      return false;
    }

    return { punditCheck };
  }

  render() {
    if (Children.count(this.props.children) > 1) {
      return React.createElement(this.props.element, {
        className: 'PunditContainer'
      }, this.props.children);
    }
    return this.props.children;
  }
}

export default PunditContainer;
