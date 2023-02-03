import { Grid, Segment } from "semantic-ui-react";

export default function ProfileBio({user}) {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Segment vertical>
                        <h3>{user.username}</h3>
                    </Segment>
                    <Segment>
                        <span>Best trivia subject: {user.bio}</span>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}