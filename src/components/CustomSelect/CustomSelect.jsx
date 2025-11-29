import React from 'react'
import './CustomSelect.scss'
import Select from 'react-select'

function CustomSelect({loading, className, value, placeholder, options, onChange, styles={}, isSearchable=true}) {
  return (
    <div>
      <Select
        styles={{
          option: (base) => ({ ...base, whiteSpace: 'pre' }),
          singleValue: (base) => ({ ...base, whiteSpace: 'pre' }),
          ...styles,
        }}
        className="select-column-modal-select"
        classNamePrefix="custom-select"
        isSearchable={isSearchable}
        name="color"
        isLoading={loading}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        options={options}
      />
    </div>
  )
}

export default CustomSelect