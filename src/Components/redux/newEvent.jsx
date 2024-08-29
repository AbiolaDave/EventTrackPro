import { createSlice } from "@reduxjs/toolkit";

export const newEvent = createSlice({
  name: "event",
  initialState: {
    createEvent: "empty",
    sender: JSON.parse(localStorage.getItem("sender")) || [],
  },
  reducers: {
    startNewEvent: (state) => {
      state.createEvent = "newevent";
    },
    addCounter: (state) => {
      state.createEvent = "addcount";
    },
    viewEvent: (state) => {
      state.createEvent = "viewevent";
    },
    startCount: (state) => {
      state.createEvent = "startcount";
    },
    resetPage: (state) =>{
      state.createEvent = "empty"
    },
    coordinateCount: (state) => {
      state.createEvent = "coordinatecount";
    },
    adminStart: (state) => {
      state.createEvent = "adminstart";
    },
    coordinatorStart: (state) => {
      state.createEvent = "coordinatorstart";
    },
    setSender: (state, action) => {
      state.sender = [action.payload];
      localStorage.setItem("sender", JSON.stringify(state.sender));
    },
  },
});

export const {
  startNewEvent,
  addCounter,
  viewEvent,
  startCount,
  coordinateCount,
  adminStart,
  coordinatorStart,
  setSender,
  resetPage,
} = newEvent.actions;
export default newEvent.reducer;
