import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = { scheduleItems: [] };
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addScheduleItems: (state = initialState, action) => {
      state.scheduleItems.push(action.payload);
      console.log("add schedule reducer");
    },
    removeScheduleItems: (state, action) => {
      state.scheduleItems = state.scheduleItems.filter((x) => x.name !== action.payload);
    },
  },
});

// export state to global
export const selectScheduleItems = (state) => state.schedule.scheduleItems;

// export actions to global
export const { addScheduleItems, removeScheduleItems } = scheduleSlice.actions;

// export reducer to global
export default scheduleSlice.reducer;