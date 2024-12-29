import React from 'react';

const Select = ({ id, name, options, value, onChange, onBlur, error, touched }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {name}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
        error && touched ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
      }`}
    >
      <option value="" disabled>
        Select {name}
      </option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
    {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Select;
