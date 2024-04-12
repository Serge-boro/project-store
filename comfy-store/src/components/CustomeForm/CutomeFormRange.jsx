import { formatPrice } from '../../utils'

const FormRange = ({ label, name, price, size, onChange, value, htmlFor }) => {
  const step = 1000

  return (
    <div className='form-control'>
      <label htmlFor={htmlFor} className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
        <span>{formatPrice(value)}</span>
      </label>
      <input
        id={name}
        type='range'
        name={name}
        min={0}
        max={price}
        value={value}
        onChange={onChange}
        step={step}
        className={`range range-primary ${size}`}
      />
      <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'>0</span>
        <span className='font-bold text-md'>Max: {formatPrice(price)}</span>
      </div>
    </div>
  )
}

export default FormRange
