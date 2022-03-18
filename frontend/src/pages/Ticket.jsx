import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Ticket() {
  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  )
  const dispatch = useDispatch()
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTicket(ticketId))

    if (isError) {
      toast.error(message)
    }

    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [ticketId, isSuccess, isError, message, dispatch])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className='ticket-page'>
        <header className='ticket-header'>
          <BackButton url='/tickets' />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {' '}
              {ticket.status}{' '}
            </span>
          </h2>
          <h3>
            {' '}
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />

          <div className='ticket-desc'>
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>

        {ticket.status !== 'closed' && (
          <button className='btn btn-block btn-danger' onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </>
  )
}
