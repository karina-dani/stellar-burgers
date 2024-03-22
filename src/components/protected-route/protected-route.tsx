import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getAuthChecked,
  getUserIsAuth
} from '../../../src/services/auth/slice';
import { useSelector } from '../../../src/services/store';
import { Preloader } from '../ui/preloader';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {
  const isAuthChecked = useSelector(getAuthChecked);
  const userIsAuth = useSelector(getUserIsAuth);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && userIsAuth) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userIsAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

//чтобы пропускать только авторизованных пользователей
export const OnlyAuth = Protected;
//чтобы пропускать только неавторизованных
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
