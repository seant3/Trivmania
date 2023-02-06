import "./LoginPage.css";

import { useState } from "react";
import { Button, Image, Form, Grid, Header, Segment, Message } from "semantic-ui-react";

import { useNavigate, Link } from "react-router-dom";

import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


export default function LoginPage({handleSignupOrLogin}) {
    const [error, setError] = useState('')
    const [state, setState] = useState({
        email: '',
        password: '',
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
            await userService.login(state);
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
              <Image src="https://imgur.com/gteinTi.png" size='mini'/>Login to your Account
           </Header>
           <Form autoComplete="off" onSubmit={handleSubmit}>
             <Segment stacked>
               
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
               
               <Button type="submit" className="btn" size="large" fluid>
                 Login
               </Button>
             </Segment>
             {error ? <ErrorMessage error={error} /> : null}
           </Form>
           <Message>
            New here? <Link to="/signup">Sign up!</Link>
           </Message>
         </Grid.Column>
       </Grid>
   
    );
}