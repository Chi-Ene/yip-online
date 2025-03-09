import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    updateOrder(state, action) {
      const { id, newStatus } = action.payload;
      const order = state.orders.find((order) => order.id === id);
      if (order) order.status = newStatus;
    },
  },
});

export const { setOrders, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const getOrders = (state) => state.orders.orders;
