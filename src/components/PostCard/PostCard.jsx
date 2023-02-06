import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({post, addLike, deleteLike, loggedUser}) { 
    const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username);
    const likeColor = likedIndex > -1 ? 'blue' : 'grey';
    const clickHandler = likedIndex > -1 ? () => deleteLike(post.likes[likedIndex]._id): () => addLike(post._id)

    return (
      <Card key={post._id} raised>
        <Card.Content>
          <Card.Header>
            <Link to={`/${post.user.username}`}>
              {post.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
        <Card.Content textAlign="left">
          <Card.Description>Question: {post.question}</Card.Description>
          <br/>
          <Card.Description>Correct Answer: {post.correctAnswer}</Card.Description>
          <Card.Description>Incorrect Answer: {post.incorrectAnswer1}</Card.Description>
          <Card.Description>Incorrect Answer: {post.incorrectAnswer2}</Card.Description>
          <Card.Description>Incorrect Answer: {post.incorrectAnswer3}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
          <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler} />
          {post.likes.length} Likes
        </Card.Content>
      </Card>  
    );
  }
  