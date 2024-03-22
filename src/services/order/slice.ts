import { createSlice } from '@reduxjs/toolkit';
import { newOrder, fetchOrderByNumber } from './actions';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
};

const initialState: TOrderState = {
  order: null,
  orderRequest: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload[0];
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const reducer = orderSlice.reducer;
export const { getOrder, getOrderRequest } = orderSlice.selectors;
