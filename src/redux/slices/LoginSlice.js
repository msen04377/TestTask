const {createSlice} = require('@reduxjs/toolkit');

const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    token: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
    },
  },
});
export const {
    login,
} = LoginSlice.actions;
export default LoginSlice.reducer;
