import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../../src/utils/types';
import { fetchIngredients } from './actions';

type TIngredientsState = {
  ingredientsLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredientsState = {
  ingredientsLoading: false,
  ingredients: []
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    setIngredientsLoading: (state, action: PayloadAction<boolean>) => {
      state.ingredientsLoading = action.payload;
    },
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIngredientsLoading: (state) => state.ingredientsLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsLoading = false;
      });
  }
});

export const { setIngredientsLoading, setIngredients } =
  burgerIngredientsSlice.actions;
export const reducer = burgerIngredientsSlice.reducer;
export const { getIngredientsLoading, getIngredients } =
  burgerIngredientsSlice.selectors;
