export const fetchExtraReducer = ({ thunk, successCallback }) => {
  return {
    [thunk.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [thunk.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      if (successCallback) {
        Object.assign(state, successCallback(state, action.payload));
      }
    },
    [thunk.rejected]: (state, action) => {
      console.log("failled");
      state.status = "failed";
      console.log(action.error.message);
      state.error = action.error.message;
    },
  };
};
