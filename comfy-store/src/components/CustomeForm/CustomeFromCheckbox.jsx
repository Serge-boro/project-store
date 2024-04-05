const FromCheckbox = ({ label, name, size, htmlFor, value, onChange }) => {
  return (
    <div className='form-control items-center'>
      <label htmlFor={htmlFor} className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <input
        id={name}
        type='checkbox'
        className={`checkbox checkbox-primary ${size}`}
        name={name}
        checked={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FromCheckbox
