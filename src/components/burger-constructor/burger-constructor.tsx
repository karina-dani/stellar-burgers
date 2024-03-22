import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  clearConstructor,
  getItems
} from '../../../src/services/burger-constructor/slice';
import {
  clearOrder,
  getOrder,
  getOrderRequest
} from '../../../src/services/order/slice';
import { getUserIsAuth } from '../../../src/services/auth/slice';
import { useNavigate } from 'react-router-dom';
import { newOrder } from '../../../src/services/order/actions';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(getItems);

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrder);

  const userIsAuth = useSelector(getUserIsAuth);

  let itemsToOrder: string[] = [];

  useEffect(() => {
    if (constructorItems.bun && constructorItems.ingredients) {
      itemsToOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
    }
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!userIsAuth) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      dispatch(newOrder(itemsToOrder));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
