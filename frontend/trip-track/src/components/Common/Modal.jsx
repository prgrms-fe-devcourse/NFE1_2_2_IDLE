import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './Modal.css';  // 모달 스타일 정의

const Modal = ({ onClose, children, className = '' }) => {
  // 모달이 열려있지 않으면 아무 것도 렌더링하지 않음
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${className}`} onClick={(e) => e.stopPropagation()}>
        {/* 모달 닫기 버튼 */}
        <Button className="modal-close-button" onClick={onClose} label="&times;" />
        {/* 모달의 내용이 children으로 전달됨 */}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;