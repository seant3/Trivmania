import { useState, useEffect } from "react";
import shuffleService from "../../utils/shuffleService";
import AnswerDisplay from "../../components/AnswerDisplay/AnswerDisplay";
import EndGameDisplay from "../EndGameDisplay/EndGameDisplay";
import { Icon, Container, Button, Menu, Item, Header, Segment, Grid, Message } from "semantic-ui-react";

import he from 'he';

export default function StartGame({data, handleAddPost, category, difficulty, setIsPlaying}) {
    const [question, setQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [allChoices, setAllChoices] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [points, setPoints] = useState(0);
    const [isCorrect, setIsCorrect] = useState({answer: ""})
    const [gameOver, setGameOver] = useState(false)
    const [showNext, setShowNext] = useState(false)

    function getQAndA() {
        setQuestion(he.decode(data[questionNum].question))
        setCorrectAnswer(he.decode(data[questionNum].correct_answer))
        
        let answers = [];
        data[questionNum].incorrect_answers.map((incorrectAnswer) => {
            answers.push(he.decode(incorrectAnswer))  
        });
        answers.push(he.decode(data[questionNum].correct_answer))
        const shuffledAnswers = shuffleService.shuffle(answers)

        setAllChoices(shuffledAnswers)
        setShowNext(false);
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
        setShowNext(true);
    }

    function nextQuestion() {
        setIsCorrect({
            answer: ""
        })
        
        if (questionNum +1 == data.length) {
            setGameOver(true)
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
            {gameOver ?
                <EndGameDisplay setIsPlaying={setIsPlaying} points={points} handleAddPost={handleAddPost} category={category} difficulty={difficulty}/> :
                <>
                    
                    <Grid textAlign="center" style={{ height: "60vh" }} verticalAlign="middle">
                    
                        <Grid.Column style={{ maxWidth: 450 }}>
                        <Segment.Group horizontal>
                            <Segment>{`Question #${questionNum + 1}`}</Segment>
                            
                            <Segment>Points: {points}</Segment>
                        </Segment.Group> 
                                 
                        
                            <Segment>
                                {question}
                                <Menu fluid pointing vertical>
                                    <AnswerDisplay allChoices={allChoices} verifyAnswer={verifyAnswer} isCorrect={isCorrect}/>
                                </Menu>
                            </Segment>
                            
                        </Grid.Column>
                        
                    </Grid>
                    {showNext ?        
                            <Segment basic>
                            <Button animated onClick={nextQuestion} type="submit" className="btn" size="large" fluid>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button> 
                            </Segment> : ''
                            }
             </>   
            }
            
        </>
        
    )
}