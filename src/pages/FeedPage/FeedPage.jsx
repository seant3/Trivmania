import { useState, useEffect } from 'react';

import PageHeader from "../../components/PageHeader/PageHeader";
import AddQuestionForm from "../../components/AddQuestionForm/AddQuestionForm";
import PostDisplay from '../../components/PostDisplay/PostDisplay';

import { Grid } from "semantic-ui-react";

import * as postsQuestionAPI from "../../utils/postQuestionApi";
import * as likesApi from "../../utils/likesApi";

export default function FeedPage({loggedUser}) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId);
            console.log(data, " this is from addLike")
            getPosts()
        } catch (err) {
            console.log(err, "err in addLike Feed Page")
        }
    }

    async function deleteLike(likeId) {
        try {
            const data = await likesApi.deleteLike(likeId);
            getPosts()
        } catch (err) {
            console.log(err, "err in deleteLike Feed Page")
        }
    }

    async function handleAddPost(post) {
        console.log(post, "this is post")
        try {
            const response = await postsQuestionAPI.create(post);
            console.log(response);
            setPosts([response.post, ...posts])
        } catch (err) {
            console.log(err.message);
            setError("Error creating post, try again");
        }
    }

    async function getPosts() {
        console.log("getPosts is firing")
        try {
            const response = await postsQuestionAPI.getAll();
            console.log(response, " response content in getPosts");
            setPosts(response.data);
        } catch (err) {
            console.log(err.message, " this is the error in GetPosts")
        }
    }

    useEffect(() => {
        getPosts();
    }, []);



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