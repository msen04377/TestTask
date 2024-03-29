const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      console.log("state ::::::", state,  "payload",action.payload)
      let tempData = state.data;
      let isItemExist = false;
      tempData?.map(item => {
        if (item.id == action?.payload?.id) {
          isItemExist = true;
          item.qty = item.qty + 1;
        }
      });
      if (!isItemExist) {
        console.log("payload push",action.payload.length)
        if(action.payload.length === 0){
          tempData = []
        }else{
          tempData?.push(action.payload);
        }
      }
      console.log("tempData@@@@@@", tempData)
      state.data = tempData;
    },
    reduceItemFromCart(state, action) {
      let tempData = state.data;

      tempData.map(item => {
        if (item.id == action.payload.id) {
          item.qty = item.qty - 1;
        }
      });

      state.data = tempData;
    },
    removeItemFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);

      state.data = tempData;
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
  emptyCart,
} = CartSlice.actions;
export default CartSlice.reducer;
