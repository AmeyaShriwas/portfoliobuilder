import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// API Base URL (Replace with your actual API endpoint)
const API_URL = process.env.REACT_APP_BASEURL || 'https://api.resumeportfolio.ameyashriwas.in';
console.log('api', API_URL)

// ✅ 1. User Signup (Async Action)
export const userSignup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ✅ 2. User Login (Async Action)
export const userLogin = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ✅ 3. Forgot Password (Async Action)
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ✅ 4. Update Password (Async Action)
export const verifyOtp = createAsyncThunk("auth/verify-otp", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

// ✅ 4. Update Password (Async Action)
export const updatePassword = createAsyncThunk("auth/updatePassword", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/update-password`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteUnverifiedUser = createAsyncThunk("auth/deleteUser", async(data, {rejectWithValue})=> {
  try{
    const response = await axios.delete(`${API_URL}/auth/deleteUser`, data);
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})

// ✅ Auth Slice
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    token: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
    message: null,
  },
  reducers: {
    // Manual Login (if needed)
    UserLogin: (state, action) => {
      const data = action.payload;
      state.data = data;
      state.token = data.token;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    // Manual Logout
    UserLogout: (state) => {
      state.data = {};
      state.token = null;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    resetMessage: (state) => {
      state.message = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // // ✅ Signup Reducers
      // .addCase(userSignup.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(userSignup.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.data = action.payload;
      //   state.token = action.payload.token;
      //   state.isLoggedIn = true;
      //   state.message = "Signup successful!";
      // })
      // .addCase(userSignup.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      // ✅ Login Reducers
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.message = "Login successful!";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Forgot Password Reducers
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Update Password Reducers
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Actions and Reducer
export const { UserLogin, UserLogout, resetMessage, resetError } = AuthSlice.actions;
export default AuthSlice.reducer;
