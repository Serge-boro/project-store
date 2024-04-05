const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, idx) => {
    const amounts = idx + 1

    return (
      <option key={amounts} value={amounts}>
        {amounts}
      </option>
    )
  })
}
export default generateAmountOptions
