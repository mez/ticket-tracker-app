import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { createTicket, reset } from '../features/tickets/ticketSlice'

export default function NewTicket() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    user: user.id,
    product: 'iPhone',
    description: '',
  })

  const { product, description } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }
  }, [dispatch, isError, isSuccess, navigate, message])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(createTicket(formData))
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            type='text'
            className='form-control'
            disabled
            value={user.name}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input
            type='text'
            className='form-control'
            disabled
            value={user.email}
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={onChange}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iPad'>iPad</option>
              <option value='iMac'>iMac</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Description of the issue</label>
            <textarea
              placeholder='Type description here'
              className='form-control'
              id='description'
              value={description}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn  btn-block'>Submit Ticket</button>
          </div>
        </form>
      </section>
    </>
  )
}
