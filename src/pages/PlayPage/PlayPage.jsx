import { useState, useEffect } from "react";

import { Container, Button, Menu, Item, Header, Segment, Grid, Message } from "semantic-ui-react";
import shuffleService from "../../utils/shuffleService";
import AnswerDisplay from "../../components/AnswerDisplay/AnswerDisplay";

import triviaApi from "../../utils/triviaApi";

import he from 'he'

export default function PlayPage() {
    const [question, setQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [allChoices, setAllChoices] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [points, setPoints] = useState(0);

    async function getQAndA() {
        try {
        const response = await triviaApi.getQuestions();
        console.log(response.results, "this is the response from getQuestions")
        setQuestion(he.decode(response.results[questionNum].question))
        setCorrectAnswer(response.results[questionNum].correct_answer)
        
        let answers = [];
        response.results[questionNum].incorrect_answers.map((incorrectAnswer) => {
            answers.push(he.decode(incorrectAnswer))  
        });
        answers.push(he.decode(response.results[questionNum].correct_answer))
        const shuffledAnswers = shuffleService.shuffle(answers)

        setAllChoices(shuffledAnswers)
        } catch (err) {
            console.log(err, "error in getQuestions for PlayPage")
        }

    }

    function verifyAnswer(e) {
        if (e === correctAnswer) {
            setPoints(points + 1);
        }
    }

    useEffect(() => {
        getQAndA();
       
    }, []);

    return (
        <Grid centered>
            <Grid.Column>
            <Header>
                {`Question #${questionNum +1}`}
            </Header>
            <Segment>
                {question}
            </Segment>
            <Menu vertical fluid size="huge">
                <AnswerDisplay allChoices={allChoices}/>
            </Menu>
            <Segment>
                <Button type="submit" className="btn" size="large" fluid>
                    Next
                </Button>
            </Segment>
            </Grid.Column>
        </Grid>
    )
}
