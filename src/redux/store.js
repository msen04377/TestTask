const {configureStore} = require('@reduxjs/toolkit');

import ProductReduer from './slices/ProductsSlice';
import WishlistReducer from './slices/WishlistSlice';
import CartReducer from './slices/CartSlice';
import AddressReducer from './slices/AddressSlice';
import OrderReducer from './slices/OrderSlice';
import LoginSlice from './slices/LoginSlice';
export const store = configureStore({
  reducer: {
    product: ProductReduer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    address: AddressReducer,
    order: OrderReducer,
    LoginSlice: LoginSlice
  },
});
