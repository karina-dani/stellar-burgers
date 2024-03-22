import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth/slice';
import { reducer as ingredientsReducer } from './burger-ingredients/slice';
import { reducer as constructorReducer } from './burger-constructor/slice';
import { reducer as orderReducer } from './order/slice';
import { reducer as ordersFeedReducer } from './orders-feed/slice';
import { reducer as userOrdersReducer } from './user-orders/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: ordersFeedReducer,
  userOrders: userOrdersReducer
});
