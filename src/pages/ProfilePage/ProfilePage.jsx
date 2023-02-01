import { useState, useEffect } from 'react';

import { Grid } from "semantic-ui-react";
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PageHeader from '../../components/PageHeader/PageHeader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostDisplay from '../../components/PostDisplay/PostDisplay';

import userService from '../../utils/userService';



export default function ProfilePage() {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}