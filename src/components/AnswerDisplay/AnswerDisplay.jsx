import { useState, Component } from "react"
import { Menu, Grid, Header } from "semantic-ui-react"

import Question from "../Question/Question"

export default function AnswerDisplay({allChoices, verifyAnswer, isCorrect}) {
    const questionJsx = allChoices.map((answer) => {
        return <Question 
                    key={answer}
                    choice={answer}
                    verifyAnswer={verifyAnswer}
                    isCorrect={isCorrect}
                />
            })

    return (
        <>
            {questionJsx}    
        </>
    )
}