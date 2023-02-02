import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PageHeader from '../../components/PageHeader/PageHeader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostDisplay from '../../components/PostDisplay/PostDisplay';

import userService from '../../utils/userService';
import * as likesApi from "../../utils/likesApi";



export default function ProfilePage({loggedUser}) {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const { username } = useParams();

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId);
            getProfile();
        } catch (err) {
            console.log(err, "err in addLike Feed Page")
        }
    }

    async function deleteLike(likeId) {
        try {
            const data = await likesApi.deleteLike(likeId);
            getProfile();
        } catch (err) {
            console.log(err, "err in deleteLike Feed Page")
        }
    }

    async function getProfile() {
        console.log("Get profile in profile page firing")
            try {
                const response = await userService.getProfile(username);
                console.log(response, " response from getProfile in Profile Page");

                setPosts(response.data);
                setUser(response.user);
            } catch (err) {
                console.log(err.message);
                setError("Profile does not exist");
            }
    }

    useEffect(() => {
        getProfile();
    }, [username])

        if(error) {
            return (
                <>
                <PageHeader/>
                <ErrorMessage error={error}/>;
                </>
            )
        }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio user={user}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <PostDisplay 
                        posts={posts}
                        isProfile={true}
                        loggedUser={loggedUser}
                        addLike={addLike}
                        deleteLike={deleteLike}
                        />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}