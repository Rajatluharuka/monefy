import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
