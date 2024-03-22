import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedOrders } from '../../../src/services/orders-feed/slice';
import { useDispatch, useSelector } from '../../../src/services/store';
import { fetchFeeds } from '../../../src/services/orders-feed/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  //if (!orders.length) {
  //  return <Preloader />;
  //}

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
