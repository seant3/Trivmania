import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react"

export default function AddQuestionForm({handleAddPost}){
    const [state, setState] = useState({
        question: '',
        correctAnswer: '',
        incorrectAnswer1: '',
        incorrectAnswer2: '',
        incorrectAnswer3: ''
    });
    

    function handleSubmit(e) {
        e.preventDefault();
        console.log(state, "this is the handleSubmit from user input")
        handleAddPost(state);
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="question"
                    value={state.question}
                    placeholder="What question do you want to add to the game?"
                    onChange={(handleChange)}
                    required
                />
                <Form.Input
                    className="form-control"
                    name="correctAnswer"
                    value={state.correctAnswer}
                    placeholder="Correct Answer"
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    className="form-control"
                    name="incorrectAnswer1"
                    value={state.incorrectAnswer1}
                    placeholder="Incorrect Answer"
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    className="form-control"
                    name="incorrectAnswer2"
                    value={state.incorrectAnswer2}
                    placeholder="Incorrect Answer"
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    className="form-control"
                    name="incorrectAnswer3"
                    value={state.incorrectAnswer3}
                    placeholder="Incorrect Answer"
                    onChange={handleChange}
                    required
                />
                
                <Button type="submit" className="btn">
                    Post Your Question
                </Button>
            </Form>
        </Segment>
    )
}