import { useState } from "react";
import { Button, Form, Grid, Header, Segment, Message, Image } from "semantic-ui-react";

import { useNavigate, Link } from "react-router-dom";

import userService from "../../utils/userService";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import "./SignupPage.css";



export default function SignupPage({handleSignupOrLogin}) {
    const [error, setError] = useState('')
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    });

    const navigate = useNavigate();

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await userService.signup(state);
            handleSignupOrLogin();
            navigate('/')
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    return (
      
        <Grid textAlign="center" style={{ height: "95vh" }} verticalAlign="middle">
         <Grid.Column style={{ maxWidth: 450 }}>
           <Header as="h2" textAlign="center">
              <Image src="https://imgur.com/gteinTi.png" size="mini"/>Sign Up
           </Header>
           <Form autoComplete="off" onSubmit={handleSubmit}>
             <Segment stacked>
               <Form.Input
                 name="username"
                 placeholder="username"
                 value={state.username}
                 onChange={handleChange}
                 required
               />
               <Form.Input
                 type="email"
                 name="email"
                 placeholder="email"
                 value={state.email}
                 onChange={handleChange}
                 required
               />
               <Form.Input
                 name="password"
                 type="password"
                 placeholder="password"
                 value={state.password}
                 onChange={handleChange}
                 required
               />
               <Form.Input
                 name="passwordConf"
                 type="password"
                 placeholder="confirm password"
                 value={state.passwordConf}
                 onChange={handleChange}
                 required
               />
               <Form.TextArea
                 label="bio"
                 name="bio"
                 placeholder="What's your best trivia subject?"
                 onChange={handleChange}
               />
               <Button type="submit" className="btn">
                 Signup
               </Button>
             </Segment>
             {error ? <ErrorMessage error={error} /> : null}
           </Form>
           <Message>
            Existing User? <Link to="/login">Login!</Link>
           </Message>
         </Grid.Column>
       </Grid>
       
    );
}
