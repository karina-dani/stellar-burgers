import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'burgerIngredients/fetchIngredients',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);
