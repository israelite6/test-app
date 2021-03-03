import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postReducer from "./../features/post/postSlice";

export default configureStore({
  reducer: {
    counters: counterReducer,
    post: postReducer,
  },
});
