import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeeds } from './actions';

type TOrdersFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TOrdersFeed = {
  orders: [],
  total: 0,
  totalToday: 0
};

const ordersFeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const reducer = ordersFeedSlice.reducer;
export const { getFeedOrders, getTotal, getTotalToday } =
  ordersFeedSlice.selectors;
