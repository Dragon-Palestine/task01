import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  } catch {
    return false;
  }
};

const initialState = {
  isDarkMode: getInitialTheme(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
      try {
        localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
      } catch {
        // ignore storage errors
      }
    },
    setTheme(state, action) {
      state.isDarkMode = Boolean(action.payload);
      try {
        localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
      } catch {
        // ignore storage errors
      }
    },
  },
});

export const { toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;

