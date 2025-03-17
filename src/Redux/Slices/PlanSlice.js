import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CreatePlan = createAsyncThunk('/plan/createPlan', async(data, {rejectWithValue})=> {
    try{

    }
    catch(error){
        
    }
})

const PlanSlice = createSlice({
    name: 'plan',
    initialState: {
        planStatus: 'inactive',
        planDetail: {}
    }
})