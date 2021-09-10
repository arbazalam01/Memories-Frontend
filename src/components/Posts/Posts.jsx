import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { fetchPosts } from "../../apis";
import { getPosts } from "../../RecoilState/Posts";
import Post from "./Post/Post";
import useStyles from "./styles.js";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = () => {
  const classes = useStyles();
  const [allPosts, setAllPosts] = useRecoilState(getPosts);
  const fetchPost = async () => {
    const postdata = await fetchPosts();
    setAllPosts(postdata.data);
  };
  useEffect(() => {
    fetchPost();
  });
  return !allPosts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      className={classes.container}
      alignItems="stretch"
      spacing={3}
    >
      {allPosts.map((post) => (
        <Grid item xs={12} sm={6} key={post._id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
