import { Card } from "semantic-ui-react"
import QuestionCard from "../QuestionCard/QuestionCard"

function PostDisplay({posts, isProfile, loggedUser, addLike, deleteLike}) {
   console.log(posts, "this is posts in PostDisplay")
 const postsJsx = posts.map((post) => {
    return <QuestionCard 
               post={post} 
               key={post._id} 
               isProfile={isProfile}
               addLike={addLike}
               deleteLike={deleteLike}
               loggedUser={loggedUser}
               />
 });   
 return <Card.Group itemsPerRow={1}>{postsJsx}</Card.Group>   
}

export default PostDisplay;