import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const themeAction = themeSlice.actions;
export default themeSlice.reducer;
