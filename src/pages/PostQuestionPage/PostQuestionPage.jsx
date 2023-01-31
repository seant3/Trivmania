import { useState } from 'react';

import PageHeader from "../../components/PageHeader/PageHeader";
import AddQuestionForm from "../../components/AddQuestionForm/AddQuestionForm";
import CommunityIndex from "../../components/CommunityIndex/CommunityIndex";

import { Grid } from "semantic-ui-react";

import * as postsQuestionAPI from "../../utils/postQuestionAPI";

export default function PostQuestionPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    async function handleAddPost(post) {
        try {
            const response = await postsQuestionAPI.create(post);
            console.log(response);
            setPosts([response.post, ...posts])
        } catch (err) {
            console.log(err.message);
            setError("Error creating post, try again");
        }
    }

    return (  
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddQuestionForm handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <CommunityIndex />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}