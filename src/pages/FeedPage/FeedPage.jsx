import { useState, useEffect } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import AddQuestionForm from "../../components/AddQuestionForm/AddQuestionForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";

import { Grid } from "semantic-ui-react";

import postQuestionApi from "../../utils/postQuestionAPI";
import likeButton from "../../utils/likeButton";

export default function FeedPage({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  async function addLike(postId) {
    try {
      const data = await likeButton.create(postId);
      getPosts();
    } catch (err) {
      console.log(err, "err in addLike Feed Page");
    }
  }

  async function deleteLike(likeId) {
    try {
      const data = await likeButton.removeLike(likeId);
      getPosts();
    } catch (err) {
      console.log(err, "err in deleteLike Feed Page");
    }
  }

  async function handleAddPost(post) {
    console.log(post, "this is post in handleAddPost");
    try {
      const response = await postQuestionApi.create(post);
      setPosts([response.post, ...posts]);
    } catch (err) {
      console.log(err.message);
      setError("Error creating post, try again");
    }
  }

  async function getPosts() {
    try {
      const response = await postQuestionApi.getAll();
      setPosts(response.data);
    } catch (err) {}
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />
      </>
    );
  }
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddQuestionForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay
            posts={posts}
            isProfile={false}
            addLike={addLike}
            deleteLike={deleteLike}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
