// import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ text, canSave, spinnerButton }) => {
  return (
    <button className='btn btn-primary btn-block' disabled={!canSave}>
      {spinnerButton ? (
        <span className='loading loading-spinner'>sending...</span>
      ) : (
        text || 'submit'
      )}
    </button>
  )
}

export default SubmitBtn
