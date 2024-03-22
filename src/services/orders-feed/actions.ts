import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const res = await getFeedsApi();
  console.log(res);
  return res;
});
