import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData,
  TUserResponse
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { setAuthChecked, setUser, setUserIsAuth } from './slice';

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, name, password }: TRegisterData) => {
    const res = await registerUserApi({ email, name, password });
    //localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    // localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  }
);

export const update = createAsyncThunk(
  'auth/update',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    const res = await updateUserApi({ email, name, password });
    return res.user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  //localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const checkUserAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      getUserApi()
        .then((res: TUserResponse) => {
          dispatch(setUser(res.user));
          dispatch(setUserIsAuth(true));
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);
