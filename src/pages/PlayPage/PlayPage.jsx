import { useState, useEffect } from "react";

import { Container, Button, Menu, Item } from "semantic-ui-react";
import shuffleService from "../../utils/shuffleService";

import triviaApi from "../../utils/triviaApi";

export default function PlayPage() {
    const [question, setQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allChoices, setAllChoices] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [points, setPoints] = useState(0);

    async function getQAndA() {
        try {
        const response = await triviaApi.getQuestions();
        console.log(response.results, "this is the response from getQuestions")
        setQuestion(response.results[questionNum].question)
        setCorrectAnswer(response.results[questionNum].correct_answer)
        // setIncorrectAnswers(response.results[questionNum].incorrect_answers)
        
        let answers = [];
        response.results[questionNum].incorrect_answers.map((incorrectAnswer) => {
            answers.push(incorrectAnswer)  
        });
        answers.push(response.results[questionNum].correct_answer)
        const shuffledAnswers = shuffleService.shuffle(answers)

        setAllChoices(shuffledAnswers)
        } catch (err) {
            console.log(err, "error in getQuestions for PlayPage")
        }

    }

    useEffect(() => {
        getQAndA();
       
    }, []);

    return (
        <Container>
            <div>{question}</div>
            <div>{allChoices}</div>
            <div></div>
        </Container>
    )
}
