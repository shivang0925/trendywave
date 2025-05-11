import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

// Thunks
// method 2
// export const fetchProducts = createAsyncThunk("product/fetch", async () => {
//   const res = await fetch("https://fakestoreapi.com/products/");
//   const data = await res.json();
//   return data;
// });

//thunk mtlb ek function
// method 1
export function fetchProducts() {
  return async function fetchProductThunk(dispath, getState) {
    dispath(setStatus(STATUSES.LOADING));

    try {
      const res = await fetch("https://fakestoreapi.com/products/");
      const data = await res.json();
      dispath(setProducts(data));
      dispath(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispath(setStatus(STATUSES.ERROR));
    }
  };
}
