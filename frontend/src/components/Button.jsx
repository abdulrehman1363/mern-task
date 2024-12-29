//import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  type = 'button', 
  onClick = () => {}, 
  children, 
  isDisabled = false, 
  className = '' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
