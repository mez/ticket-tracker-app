import axios from 'axios'

const API_URL = '/api/tickets'


// Create a ticket
const createNote = async (ticketId, noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(`${API_URL}/${ticketId}/notes`, noteData, config)

  return response.data
}


// get all user ticket
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${API_URL}/${ticketId}/notes`, config)

  return response.data
}


const noteService = {
  createNote,
  getNotes
}

export default noteService