import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react"

export default function AddQuestionForm({handleAddPost}){
    const [question, setQuestion] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        console.log(question, "this is the handleSubmit from user input")
        handleAddPost(question);
    }

    function handleChange(e) {
        setQuestion(e.target.value)
    }

    return (
        <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="question"
                    value={question}
                    placeholder="What question do you want to add to the game?"
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