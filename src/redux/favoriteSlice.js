import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = { schedules: [] };
const favSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavItems: (state, action) => {
      // const newItem = action.payload;
      // const existingItem = state.favItems.find((item) => item.name === newItem.name);

      // if (existingItem) {
      //   // If the item already exists, increase the quantity by 1
      //   const favItems = state.favItems.map((x) =>
      //       x.name === existingItem.name ? newItem : x
      //    );
      //    state.favItems = favItems;
      // } else {
      //   // Otherwise, add a new item with qty 1
      //   state.favItems = [...state.favItems, newItem];
      // }
      // console.log("reducer");

      // const { scheduleId, landmark } = action.payload;
      // const schedule = state.favItems.find(s => s.id === scheduleId);
      // if (schedule) {
      //   schedule.landmarks.push(landmark);
      // } else {
      //   // 如果找不到指定的行程，可以選擇如何處理，例如創建新行程或忽略此操作
      // }


      const { scheduleName, landmark } = action.payload;
      const existingSchedule = state.schedules.find(schedule => schedule.scheduleName === scheduleName);
      // const existingLandmark = schedules.landmark.find(item =>item.name === landmark.name);
      if (existingSchedule) {
        // 如果找到了对应的 scheduleName，向其 landmark 数组中添加新的 landmark
        // if (!existingLandmark) {
        //   // 如果没有找到相同的 landmark，添加新的 landmark
        //   existingSchedule.landmark.push(landmark);
        // }
        // else{
        //   return;
        // }
        existingSchedule.landmark.push(landmark);
      } else {
        // 如果没有找到对应的 scheduleName，创建一个新的条目
        state.schedules.push({
          scheduleName: scheduleName,
          landmark: [landmark]
        });
      }
    },
    removeFavItems: (state, action) => {
      state.schedules = state.schedules.filter((x) => x.name !== action.payload);
    },
  },
});

// export state to global
export const selectFavItems = (state) => state.favorite.schedules;

// export actions to global
export const { addFavItems, removeFavItems } = favSlice.actions;

// export reducer to global
export default favSlice.reducer;