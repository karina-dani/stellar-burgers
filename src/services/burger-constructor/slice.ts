import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../src/utils/types';
import { nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const type = action.payload.type;

        if (type === 'bun') {
          state.bun = action.payload;
        }

        if (type === 'main' || type === 'sauce') {
          state.ingredients.push(action.payload);
        }
      },

      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    deleteItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getItems: (state) => state
  }
});

export const { addItem, deleteItem, clearConstructor } =
  burgerConstructorSlice.actions;
export const reducer = burgerConstructorSlice.reducer;
export const { getItems } = burgerConstructorSlice.selectors;
