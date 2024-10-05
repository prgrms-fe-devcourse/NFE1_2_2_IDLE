import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Button 스타일 추가

// 기본 매개변수 값을 설정하여 경고 제거
const Button = ({ label = '', onClick = () => {}, className = '', disabled = false }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // label은 필수 항목
  onClick: PropTypes.func, // onClick은 선택 항목
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;