import { useState, useEffect } from "react";

import triviaApi from "../../utils/triviaApi";

export default function PlayPage() {
    const [question, setQuestion] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [incorrectAnswers, setIncorrectAnswers] = useState([])

    async function getQuestions() {
        const response = await triviaApi.getQuestions();
        console.log(response.results, "this is the response from getQuestions")
        setQuestion(response.results[0].question)
        setCorrectAnswer(response.results[0].correct_answer)
        setIncorrectAnswers(response.results[0].incorrect_answers)
    }

    useEffect(() => {
        getQuestions();
       
    }, []);

    return (
        <>
            <div>{question}</div>
            <div>{correctAnswer + ","}{incorrectAnswers + " "}</div>
            <div></div>
        </>
    )
}
