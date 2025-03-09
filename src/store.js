import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/user/userSlice";
import orderReducer from "./components/order/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
  },
});

export default store;
