import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from "./noteService"


// initial state
const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create a new note
export const createNote = createAsyncThunk('notes/create', async ({ticketId, noteData}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    noteData.user = thunkAPI.getState().auth.user.id

    return await noteService.createNote(ticketId, noteData, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// get ticket Notes
export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await noteService.getNotes(ticketId, token)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})



export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get notes cases
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})


export const {reset} = noteSlice.actions
export default noteSlice.reducer