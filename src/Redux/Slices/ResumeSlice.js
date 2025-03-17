import { createSlice } from "@reduxjs/toolkit";

const ResumeSlice = createSlice({
    name: 'resume',
    initialState: {
       personalDetails: {},
       educationalDetails: [],
       traningExperienceDetails: [],
       skillDetails: [],
       bio: {},
       color: {}
    },
    reducers: {
        addPersonalDetails: (state, action)=> {
            state.personalDetails = action.payload
        },
        addEducationalDetails: (state, action)=> {
            const data = action.payload
            state.educationalDetails = data
        },
        addTrainingExperienceDetails: (state, action)=> {
            const data = action.payload
            state.traningExperienceDetails = data
        },
        addSkillDetails: (state, action)=> {
            const data = action.payload
            state.skillDetails = data
        },
        addBioDetails: (state, action)=> {
            const data = action.payload
            state.bio = data
        },
        addColor: (state, action)=> {
            const data = action.payload
            state.color = data
        }
    }
})

export const {addPersonalDetails, addEducationalDetails, addTrainingExperienceDetails,addSkillDetails, addBioDetails, addColor} = ResumeSlice.actions
export default ResumeSlice.reducer