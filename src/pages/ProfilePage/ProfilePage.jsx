import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Header } from "semantic-ui-react";

import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PageHeader from '../../components/PageHeader/PageHeader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostDisplay from '../../components/PostDisplay/PostDisplay';

import userService from '../../utils/userService';
import likeButton from "../../utils/likeButton";



export default function ProfilePage({loggedUser, handleLogout}) {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const { username } = useParams();

    async function addLike(postId) {
        try {
            const data = await likeButton.create(postId);
            getProfile();
        } catch (err) {
            console.log(err, "err in addLike Feed Page")
        }
    }

    async function deleteLike(likeId) {
        try {
            const data = await likeButton.removeLike(likeId);
            getProfile();
        } catch (err) {
            console.log(err, "err in deleteLike Feed Page")
        }
    }

    async function getProfile() {
        console.log("Get profile in profile page firing")
            try {
                const response = await userService.getProfile(username);

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
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                    <ErrorMessage error={error}/>;
                </>
            )
        }

    return (
        <Grid centered columns={1}>
                <Grid.Column fluid>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                </Grid.Column>
            
                <Grid.Column fluid >
                    <ProfileBio user={user}/>
                </Grid.Column>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PostDisplay 
                        posts={posts}
                        isProfile={true}
                        loggedUser={loggedUser}
                        addLike={addLike}
                        deleteLike={deleteLike}
                        />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                </Grid.Column>
            </Grid.Row>
            
        </Grid>
    )
}