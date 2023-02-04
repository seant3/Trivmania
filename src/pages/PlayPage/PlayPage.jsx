import { useState } from "react";

import { Dropdown, Container, Button, Menu, Item, Header, Segment, Grid, Message } from "semantic-ui-react";

import StartGame from "../../components/StartGame/StartGame";

import triviaApi from "../../utils/triviaApi";
import categoriesArray from "../../utils/categoriesArray"
import difficultyArray from "../../utils/difficultyArray"

export default function PlayPage() {
    
    const [data, setData] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [category, setCategory] = useState('0')
    const [difficulty, setDifficulty] = useState('0')
    
    async function getData() {
        const response = await triviaApi.getQuestions(category, difficulty);
        console.log(response.results, "this is the response from getQuestions")
        setData(response.results);
        setIsPlaying(true)
    }  

    return (
       <>
        {isPlaying ? 
            <StartGame data={data} isPlaying={isPlaying}/> :
                         
            <>
                <Dropdown
                    placeholder='Select Category'
                    fluid
                    selection
                    options={categoriesArray} 
                    value={category}
                    onChange={(e, { value}) => setCategory(value)}
                    
                />
                <Dropdown
                    placeholder='Select Difficulty'
                    fluid
                    selection
                    options={difficultyArray} 
                    value={difficulty}
                    onChange={(e, { value}) => setDifficulty(value)}
                    
                />
                <button onClick={getData}>Start Game</button>
            </>
        }   
    </>
        
    )
}

