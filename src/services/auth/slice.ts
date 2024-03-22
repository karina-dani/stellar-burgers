import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, logout, checkUserAuth, register, update } from './actions';
import { TUser } from '@utils-types';

type TAuthState = {
  user: TUser;
  userIsAuth: boolean;
  isAuthChecked: boolean; //нужно, чтобы подождать завершения проверочного запроса
};

const initialState: TAuthState = {
  user: {
    email: '',
    name: ''
  },
  userIsAuth: false,
  isAuthChecked: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setUserIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getUserIsAuth: (state) => state.userIsAuth
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.userIsAuth = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.userIsAuth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.userIsAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user.email = '';
        state.user.name = '';
        state.userIsAuth = false;
      });
  }
});

export const { setAuthChecked, setUser, setUserIsAuth } = authSlice.actions;
export const reducer = authSlice.reducer;
export const { getAuthChecked, getUser, getUserIsAuth } = authSlice.selectors;
