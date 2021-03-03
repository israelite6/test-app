import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlApi } from "./../../utils/fetch";
import { fetchExtraReducer } from "./../../utils/helper";

const QUERY_COUNTRY = `
  query($id: String!) {
    country(where: { id: { _eq: $id } }) {
      name
      ids
    }
  }
`;

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (data) => {
  const response = await graphqlApi({ query: QUERY_COUNTRY, data });
  return response;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    create: (state) => {
      state.posts.push({ title: "just title", content: "another values" });
    },
    customCreate: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: {
    ...fetchExtraReducer({
      thunk: fetchPosts,
      successCallback: (state, data) => {
        state.posts = data.country;
        return state;
      },
    }),
  },
});

export const { create, customCreate } = postSlice.actions;

export const customAdd = (post) => (dispatch) => {
  dispatch(customCreate(post));
};

export const getAllPost = (state) => state.post.posts;

export default postSlice.reducer;
