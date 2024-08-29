import { createSlice } from '@reduxjs/toolkit'
import { useState } from 'react';

export const userArray = createSlice({
  name: "myArray",
  initialState: {
    allUsers: [],
  },
  reducers: {
    pushArray: (state, action)=>{
        state.allUsers = [...state.allUsers, action.payload] 
        
    }
  },
});

export const {pushArray} = userArray.actions
export default userArray.reducer