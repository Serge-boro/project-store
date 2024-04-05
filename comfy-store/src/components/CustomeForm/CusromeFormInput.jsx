import React from 'react'

const FormInput = ({
  htmlFor,
  label,
  name,
  type,
  // defaultValue,
  size,
  onChange,
  value,
}) => {
  return (
    <div className='form-control'>
      <label className='relative label' htmlFor={htmlFor}>
        <span className='absolute label-text capitalize  mb-[0.5rem]'>
          {label}
        </span>
      </label>
      <input
        id={htmlFor}
        type={type}
        name={name}
        value={value}
        // defaultValue={defaultValue}
        className={`input input-bordered ${size} `}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
