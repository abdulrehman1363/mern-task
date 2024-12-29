//import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ 
  id, 
  name, 
  type = 'text', 
  value, 
  placeholder = '', 
  onChange, 
  onBlur = () => {}, 
  error = '', 
  touched = false, 
  className = '' 
}) => {
  return (
    <div className="mb-4">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={`block w-full p-2 border rounded ${
          error && touched ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {error && touched && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
