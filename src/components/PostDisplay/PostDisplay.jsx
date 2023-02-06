import { Card } from "semantic-ui-react";
import PostCard from "../PostCard/PostCard";

function PostDisplay({ posts, isProfile, loggedUser, addLike, deleteLike }) {
  const postsJsx = posts.map((post) => {
    return (
      <PostCard
        post={post}
        key={post._id}
        isProfile={isProfile}
        addLike={addLike}
        deleteLike={deleteLike}
        loggedUser={loggedUser}
      />
    );
  });
  return <Card.Group itemsPerRow={1}>{postsJsx}</Card.Group>;
}

export default PostDisplay;
