import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const newOrder = createAsyncThunk(
  'order/newOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumer',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders;
  }
);
