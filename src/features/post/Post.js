import { useSelector, useDispatch } from "react-redux";
import { customAdd, getAllPost, fetchPosts } from "./postSlice";
import { useCallback, useState, useEffect } from "react";

export default function Post({ ...props }) {
  const dispatch = useDispatch();

  const getPost = useSelector(getAllPost);
  const status = useSelector((state) => state.post.status);

  const [state, setStates] = useState({});

  const setState = useCallback((data) => {
    setStates((prev) => ({ ...prev, ...data }));
  }, []);

  const handleChange = useCallback(
    (name) => (event) => {
      setState({ [name]: event.target.value });
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    dispatch(fetchPosts({ id: "c76bf239-0efa-4f78-800b-a7295efd72d4" }));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {getPost.map((post, index) => (
        <div key={index}>
          {post.name} &emsp; {post.id}
        </div>
      ))}
      <div>
        <input
          type='text'
          onChange={handleChange("title")}
          placeholder='title'
        />
        <input
          type='text'
          onChange={handleChange("content")}
          placeholder='content'
        />
      </div>
      <button onClick={() => dispatch(customAdd(state))}>Add Post</button>
    </div>
  );
}
