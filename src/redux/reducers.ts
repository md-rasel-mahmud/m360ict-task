import { api } from "../api/apiConfig";
import queryParamsSlice from "./slices/queryParamsSlice";

export const reducers = {
  [api.reducerPath]: api.reducer,

  // -> SLICES
  queryParams: queryParamsSlice,
};
