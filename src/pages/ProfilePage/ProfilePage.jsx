import { useState, useEffect } from 'react';

import { Grid } from "semantic-ui-react";
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PageHeader from '../../components/PageHeader/PageHeader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostDisplay from '../../components/PostDisplay/PostDisplay';

import userService from '../../utils/userService';
import { useParams } from "react-router-dom";


export default function ProfilePage() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const { username } = useParams();

    
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
                        />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}