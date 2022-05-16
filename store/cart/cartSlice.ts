import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../../interfaces";
import { RootState } from "../store";

interface cartState {
  items: OrderState[];
  itemsCount: number;
  total: number;
}

const initialState: cartState = {
  items: [],
  itemsCount: 0,
  total: 0,
};

export const loadCart = createAsyncThunk("cart/loadCard", async (thunkApi) => {
  const serializedCart = localStorage.getItem("cart");
  if (serializedCart === null) {
    return undefined;
  }
  console.log(serializedCart);
  return JSON.parse(serializedCart);
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<OrderState>) => {
      state.items.push(action.payload);
      state.itemsCount += action.payload.quantity;
      state.total += action.payload.price;
    },
    incrementItemQuantity: (state, action: PayloadAction<string>) => {
      const orderIndex = state.items.findIndex(
        (item) => item.orderId == action.payload
      );
      state.items[orderIndex].quantity += 1;
      state.itemsCount += 1;
      state.total += state.items[orderIndex].unitPrice;
    },
    remove: (state, action: PayloadAction<string>) => {
      const orderItem = state.items.find(
        (item) => item.orderId == action.payload
      );
      if (orderItem && orderItem.quantity == 1) {
        const newItems = state.items.filter(
          (item) => item.orderId !== action.payload
        );
        state.items = newItems;
        state.itemsCount -= 1;
        state.total -= orderItem.unitPrice;
      } else {
        const orderIndex = state.items.findIndex(
          (item) => item.orderId == action.payload
        );
        state.items[orderIndex].quantity -= 1;
        state.itemsCount -= 1;
        state.total -= orderItem!.unitPrice;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.itemsCount = action.payload.itemsCount;
      state.total = action.payload.total;
    });
  },
});

export const { add, remove, incrementItemQuantity } = cartSlice.actions;

export const selectItemsCount = (state: RootState) => state.cart.itemsCount;
export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
