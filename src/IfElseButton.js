import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';

class IfElseButton extends PunditComponent {

  static displayName = 'IfElseButton';

  static propTypes = {
    ...PunditComponent.propTypes,
    className: PropTypes.string,
    ifClick: PropTypes.func,
    elseClick: PropTypes.func,
  };

  static defaultProps = {
    ...PunditComponent.defaultProps,
    className: '',
    ifClick: () => {},
    elseClick: () => {},
  };

  handleClick = (e) => {
    if (this.passesPermissions()) {
      this.props.ifClick(e);
    } else {
      this.props.elseClick(e);
    }
  };

  render() {
    return (
      <button className={`IfElseButton ${this.props.className}`.trim()} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

export default IfElseButton;
