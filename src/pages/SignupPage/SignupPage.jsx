import { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import userService from "../../utils/userService"

function SignUpPage() {
    const [error, setError] = useState('')
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    });

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        for (let fieldName in state) {
            console.log(fieldName, state[fieldName])
            FormData.append(fieldName, state[fieldName])
        }
        try {
            console.log(formData.forEach((item) => console.log(item)))
            await userService.signup(formData);
        } catch (err) {
            console.log(err, "<<<Handle Submit Signup Page")
            setError(err.message)
        }
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
         <Grid.Column style={{ maxWidth: 450 }}>
           <Header as="h2" color="teal" textAlign="center">
              Sign Up
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
                 placeholder="Confirm Password"
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
         </Grid.Column>
       </Grid>
   
    );
}

export default SignUpPage;