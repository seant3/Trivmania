import { useState } from "react";

import { Dropdown, Card, Container, Button, Menu, Item, Header, Segment, Grid, Message, GridRow, GridColumn } from "semantic-ui-react";

import StartGame from "../../components/StartGame/StartGame";

import triviaApi from "../../utils/triviaApi";
import categoriesArray from "../../utils/categoriesArray";
import difficultyArray from "../../utils/difficultyArray";
import postQuestionApi from "../../utils/postQuestionAPI";

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

    async function handleAddPost(score) {
        console.log(score, "this is post in handleAddPost")
        try {
            await postQuestionApi.create(score);
            console.log(score, "score from handleAddPost");
        } catch (err) {
            console.log(err.message);
            setError("Error creating post, try again");
        }
    }

    return (
       <>
        {isPlaying ? 
            <StartGame handleAddPost={handleAddPost} data={data} setIsPlaying={setIsPlaying} category={category} difficulty={difficulty}/> :
            <Grid textAlign="center" style={{ height: "60vh" }} verticalAlign="middle">
                
                    <GridColumn style={{ maxWidth: 450 }}>                
                        <Card.Group>
                            <Card fluid>
                                <Dropdown
                                    placeholder='Select Category'
                                    
                                    selection
                                    options={categoriesArray} 
                                    value={category}
                                    onChange={(e, { value}) => setCategory(value)}
                                    
                                />
                            </Card>
                            <Card fluid>
                                <Dropdown
                                    placeholder='Select Difficulty'
                                    
                                    selection
                                    options={difficultyArray} 
                                    value={difficulty}
                                    onChange={(e, { value}) => setDifficulty(value)}
                                    
                                />
                            </Card>
                        </Card.Group>
                        <Segment basic textAlign={"center"}>
                                <Button compact size='massive'  onClick={getData}>Start Game</Button>
                        </Segment>
                    </GridColumn>
                
            </Grid>
        }   
        </>
            
        
    )
}

