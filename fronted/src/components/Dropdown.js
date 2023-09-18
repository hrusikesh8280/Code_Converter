import React from 'react';
import Select from 'react-select';

const Dropdown = ({ options, selectedOption, onOptionChange }) => {
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={onOptionChange}
      placeholder="Select Target Language"
    />
  );
};

export default Dropdown;
