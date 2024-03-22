import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrders } from './actions';

type TOrders = {
  orders: TOrder[];
};

const initialState: TOrders = {
  orders: []
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const reducer = userOrdersSlice.reducer;
export const { getUserOrders } = userOrdersSlice.selectors;
