import { useState } from "react";

import { Container, Button, Menu, Item, Header, Segment, Grid, Message } from "semantic-ui-react";

import StartGame from "../../components/StartGame/StartGame";

import triviaApi from "../../utils/triviaApi";

export default function PlayPage() {
    
    const [data, setData] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    

    async function getData() {
        const response = await triviaApi.getQuestions();
        console.log(response.results, "this is the response from getQuestions")
        setData(response.results);
        setIsPlaying(true)
    }  

    return (
       <>
        {isPlaying ? 
            <StartGame data={data} isPlaying={isPlaying}/> :
            <button onClick={getData}>Start Game</button>
        }   
    </>
        
    )
}

