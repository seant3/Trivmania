import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function QuestionCard({post}) { 
  console.log(post, "<<<<post in QuestionCard")
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
          <Card.Description>{post.question}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
          <Icon name={"heart"} size="large" />
          Likes
        </Card.Content>
      </Card>  
    );
  }
  
  export default QuestionCard;