import { Grid, Segment } from "semantic-ui-react";

export default function ProfileBio({ user }) {
  return (
    <Segment.Group horizontal>
      <Segment>User: {user.username}</Segment>
      <Segment>Best trivia subject: {user.bio}</Segment>
    </Segment.Group>
  );
}
