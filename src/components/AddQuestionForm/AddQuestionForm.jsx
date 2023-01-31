import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react"

export default function AddQuestionForm({handleAddPost}){
    const [state, setState] = useState({
        question: "",
        category: "",
    })

    function handleSubmit(e) {
        e.preventDefault();

        handleAddPost(state);
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="question"
                    value={state.question}
                    placeholder="What question do you want to add to the game?"
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    className="form-control"
                    name="category"
                    value={state.category}
                    placeholder="What category is your question?"
                    onChange={handleChange}
                />
                <Button type="submit" className="btn">
                    Post Your Question
                </Button>
            </Form>
        </Segment>
    )
}