import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface queryParamsState {
  product: { limit: number; skip: number };
}

const initialState: queryParamsState = {
  product: { limit: 10, skip: 0 },
};

const queryParamsSlice = createSlice({
  name: "queryParams",
  initialState,
  reducers: {
    setProductLimit(state, action: PayloadAction<number>) {
      state.product.limit = action.payload;
    },
    setProductSkip(state, action: PayloadAction<number>) {
      state.product.skip = action.payload;
    },
  },
});

export default queryParamsSlice.reducer;
export const { setProductLimit, setProductSkip } = queryParamsSlice.actions;
