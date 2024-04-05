const FormSelect = ({
  label,
  name,
  list,
  // defaultValue,
  size,
  onChange,
  htmlFor,
  value,
}) => {
  return (
    <div className='form-control'>
      <label className='label-text capitalize' htmlFor={htmlFor}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        className={`input input-bordered ${size}`}
        value={value}
        // defaultValue={defaultValue}
        onChange={onChange}
      >
        {list?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelect
