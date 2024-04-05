const Loading = ({ style }) => {
  return (
    <div className={`h-screen flex items-center justify-center ${style}`}>
      <span className='loading loading-ring loading-lg'></span>
    </div>
  )
}

export default Loading
