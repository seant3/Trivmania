import { Card } from "semantic-ui-react"
import QuestionCard from "../QuestionCard/QuestionCard"

function PostDisplay({posts}) {
 const postsJsx = posts.map((post) => {
    return <QuestionCard post={post} key={post._id} />
 });   
 return <Card.Group itemsPerRow={1}>{postsJsx}</Card.Group>   
}

export default PostDisplay;