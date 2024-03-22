import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getUserOrders } from '../../../src/services/user-orders/slice';
import { fetchOrders } from '../../../src/services/user-orders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(fetchOrders());
    console.log('profile orders loaded');
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
