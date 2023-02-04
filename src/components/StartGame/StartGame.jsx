import { useState, useEffect } from "react";
import shuffleService from "../../utils/shuffleService";
import AnswerDisplay from "../../components/AnswerDisplay/AnswerDisplay";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";
import { Container, Button, Menu, Item, Header, Segment, Grid, Message } from "semantic-ui-react";

import he from 'he';

export default function StartGame({data}) {
    const [question, setQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [allChoices, setAllChoices] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [points, setPoints] = useState(0);
    const [isCorrect, setIsCorrect] = useState({answer: ""})
    const [displayResults, setDisplayResults] = useState(false)

    function getQAndA() {
        setQuestion(he.decode(data[questionNum].question))
        setCorrectAnswer(data[questionNum].correct_answer)
        
        let answers = [];
        data[questionNum].incorrect_answers.map((incorrectAnswer) => {
            answers.push(he.decode(incorrectAnswer))  
        });
        answers.push(he.decode(data[questionNum].correct_answer))
        const shuffledAnswers = shuffleService.shuffle(answers)

        setAllChoices(shuffledAnswers)
    }

    function verifyAnswer(e, { name }) {
        console.log(name, "name")
        if (name === correctAnswer) {
            setIsCorrect({
                answer: correctAnswer
            })
            setPoints(points + 1);
            console.log(e.target, "e.target =======")
        }
        setIsCorrect({
            answer: correctAnswer
        })
    }

    function nextQuestion() {
        setIsCorrect({
            answer: ""
        })
        
        if (questionNum +1 == data.length) {
            setDisplayResults(true)
        } else {
            setQuestionNum((questionNum) => questionNum +1);
        }
    }

    useEffect(() => {
        if(data.length > 0) {
            getQAndA()
        }
    }, [questionNum])

    return (
        <>
            {displayResults ?
                <ScoreDisplay points={points}/> :
                <>
                    <Grid centered>
                        <Grid.Column>
                            <Header>
                                {`Question #${questionNum + 1}`}<br></br>
                                <span>Points:{points}</span>
                            </Header>
                            <Segment>
                                {question}
                                <Menu fluid pointing vertical>
                                    <AnswerDisplay allChoices={allChoices} verifyAnswer={verifyAnswer} isCorrect={isCorrect}/>
                                </Menu>
                            </Segment>
                                    
                            <Segment>
                            <Button onClick={nextQuestion} type="submit" className="btn" size="large" fluid>
                                Next
                            </Button> 
                            </Segment>
                        </Grid.Column>
                    </Grid>
             </>   
            }
            
        </>
        
    )
}