import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Payload: { message, type, duration? }
    addNotification: {
      reducer(state, action) {
        state.notifications.push(action.payload);
      },
      prepare({ message, type = "info", duration = 3000 }) {
        return {
          payload: {
            id: nanoid(),
            message,
            type,
            duration,
          },
        };
      },
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export const selectNotifications = (state) => state.notifications.notifications;
export default notificationSlice.reducer;