import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Function to get auth token securely
const getAuthToken = () => localStorage.getItem('token');
const API_URL = process.env.REACT_APP_BASEURL || 'https://api.resumeportfolio.ameyashriwas.in';


export const addPortfolioDetails = createAsyncThunk(
    '/portfolio/add', 
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/portfolio/add`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getPortfolioDetails = createAsyncThunk(
    '/auth/getPortfolio',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/auth/getPortfolio', {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}` // Secure token usage
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const PortfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        data: {},
        selectedTemplate: '',
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPortfolioDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPortfolioDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addPortfolioDetails.rejected, (state) => {
                state.loading = false;
                state.data = {};
            })
            .addCase(getPortfolioDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPortfolioDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPortfolioDetails.rejected, (state) => {
                state.loading = false;
                state.data = {};
            });
    }
});

export default PortfolioSlice.reducer;
