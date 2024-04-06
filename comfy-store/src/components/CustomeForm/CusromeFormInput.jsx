const FormInput = ({
  htmlFor,
  label,
  name,
  type,
  size,
  onChange,
  value,
  required,
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
        className={`input input-bordered ${size} `}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default FormInput
