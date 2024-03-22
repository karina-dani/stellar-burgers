import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUser } from '../../../src/services/auth/slice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);

  return <AppHeaderUI userName={user.name} />;
};
