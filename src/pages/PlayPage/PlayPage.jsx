import { useState, useEffect } from "react";

import { Container, Button, Menu, Item, Header, Segment, Grid, Message } from "semantic-ui-react";
import shuffleService from "../../utils/shuffleService";
import AnswerDisplay from "../../components/AnswerDisplay/AnswerDisplay";
import StartGame from "../../components/StartGame/StartGame";

import triviaApi from "../../utils/triviaApi";

import he from 'he';

export default function PlayPage() {
    const [question, setQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [allChoices, setAllChoices] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [points, setPoints] = useState(0);
    const [data, setData] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [isCorrect, setIsCorrect] = useState({answer: ""})

    async function getData() {
        const response = await triviaApi.getQuestions();
        console.log(response.results, "this is the response from getQuestions")
        setData(response.results);
    }


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
        setIsPlaying(true)

    }



    useEffect(() => {
        getData();
    }, []);


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
        setQuestionNum((questionNum) => questionNum +1);
    }

    useEffect(() => {
        if(data.length > 0) {
            getQAndA()
        }
    }, [questionNum])

    return (
        
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
            {isPlaying ? <Button onClick={nextQuestion} type="submit" className="btn" size="large" fluid>
                    Next
                </Button> : <StartGame startGame={getQAndA}/>}
            </Segment>
            </Grid.Column>
        </Grid>
        
    )
}

