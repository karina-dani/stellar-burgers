import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';

export const fetchOrders = createAsyncThunk(
  'userOrders/fetchOrders',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);
