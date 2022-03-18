import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"


// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  user.id = user._id
  delete user._id
}
// initial state
const initialState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register a new user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await authService.register(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Login a user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = action.payload
      })

      // logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })

      // login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer