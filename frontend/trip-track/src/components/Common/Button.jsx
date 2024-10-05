import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ label = 'Button', onClick = () => {}, className = '', disabled = false }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;