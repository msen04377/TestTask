const {createSlice} = require('@reduxjs/toolkit');

const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    productData:[],
    data: null,
    isLoading: false,
  },
  reducers: {
    getProductsItem(state, action) {
      state.productData = action.payload;
    },
    addProducts(state, action) {
      state.data = action.payload;
    },
  },
});
export const {addProducts, getProductsItem} = ProductsSlice.actions;
export default ProductsSlice.reducer;
