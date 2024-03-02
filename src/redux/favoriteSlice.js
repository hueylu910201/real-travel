import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = { schedules: [] };
const favSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavItems: (state, action) => {
      const { scheduleName, scheduleId, time, landmarks, landmark } = action.payload;
      let isDuplicate = state.schedules.find(item => item.scheduleName === scheduleName);
      if (!isDuplicate) {
        state.schedules.push({
          scheduleId,
          scheduleName,
          time,
          landmarks,
        });
      } else {
        console.log('行程名稱重複，無法添加');
        const existingSchedule = state.schedules.find(schedule => schedule.scheduleName === scheduleName);
        if (existingSchedule) {
          // 檢查是否已存在相同的地標，避免重複添加
          const existingLandmark = existingSchedule.landmarks.find(l => l.name === landmark.name);
          if (!existingLandmark) {
            // 如果没有找到相同的 landmark，添加新的 landmark
            existingSchedule.landmarks.push(landmark);
          }
          // 如果地標已存在，則不進行任何操作
        } else {
          // 如果没有找到对应的 scheduleName，创建一个新的条目
          state.schedules.push({
            scheduleName: scheduleName,
            landmarks: [landmark] // 确保这里使用的是复数形式，与上文一致
          });
        }
      }
    },

    removeFavItems: (state, action) => {
      const { scheduleName, landmarkName } = action.payload;
      const scheduleIndex = state.schedules.findIndex(schedule => schedule.scheduleName === scheduleName);
      if (scheduleIndex !== -1) {
        const landmarks = state.schedules[scheduleIndex].landmarks;
        const filteredLandmarks = landmarks.filter(landmark => landmark.name !== landmarkName);
        state.schedules[scheduleIndex].landmarks = filteredLandmarks;
      }
    },
    updateLandmarks: (state, action) => {
      const { landmarkId, arriveTime, note } = action.payload;
      state.schedules.forEach(schedule => {
        const landmark = schedule.landmarks.find(landmark => landmark.id === landmarkId);
        if (landmark) {
          landmark.arrivalTime = arriveTime;
          landmark.note = note;
        }
      });
    },
    updateLandmarkOrder: (state, action) => {
      const { scheduleName, newLandmarks } = action.payload;
      const scheduleIndex = state.schedules.findIndex(schedule => schedule.scheduleName === scheduleName);
      if (scheduleIndex >= 0) {
        state.schedules[scheduleIndex].landmarks = newLandmarks;
      }
    }
  },
});

// export state to global
export const selectFavItems = (state) => state.favorite.schedules;

// export actions to global
export const { addFavItems, removeFavItems, updateLandmarks, updateLandmarkOrder } = favSlice.actions;

// export reducer to global
export default favSlice.reducer;