import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketService from './ticketService.js'


// initial state
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create a new ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.createTicket(ticketData, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// get user tickets
export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getTickets(token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// get ticket
export const getTicket = createAsyncThunk('tickets/getOne', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getTicket(id, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// close ticket
export const closeTicket = createAsyncThunk('tickets/close', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.closeTicket(id, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})


export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get tickets cases
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get one ticket cases
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getTicket.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // close ticket cases
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(closeTicket.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.ticket = action.payload
        state.tickets.map( (ticket) => 
          ticket._id === action.payload._id 
            ? (ticket.status = 'closed')
            : ticket)
      })
      .addCase(closeTicket.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})


export const {reset} = ticketSlice.actions
export default ticketSlice.reducer