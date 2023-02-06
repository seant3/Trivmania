import { Button, Grid, Segment, Image } from "semantic-ui-react"

import PageHeader from "../PageHeader/PageHeader";

export default function ScoreDisplay({ points, handleAddPost, category, difficulty, setIsPlaying, handleLogout, loggedUser }) {

    function handleOnClick(e) {
        e.preventDefault();
        
        handleAddPost({
            points: points,
            category: category,
            difficulty: difficulty
        });
    }

    function resetGame(e) {
        setIsPlaying(false);
    }

    return (
        <Grid centered style={{ height: "95vh" }}>
            <Grid.Row>
                <Grid.Column >
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                </Grid.Column>
            </Grid.Row>
            <Image 
            src="https://imgur.com/NWrY8Xz.png"
            
            />
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment raised textAlign={"center"} as="h2">Your Score: {points}/10</Segment>
                    <Segment basic textAlign={"center"}>
                        <Button onClick={handleOnClick} type="submit" className="btn">
                                    Post Your Score
                        </Button>
                        <Button onClick={resetGame} type="submit" className="btn">
                                    Play Again!
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        
        </Grid>
    )
}

                    

// <Grid.Row>
//     <Grid.Column>
//         <Card.Group>
//             <Card fluid>
//                 <Dropdown
//                     placeholder='Select Category'
                    
//                     selection
//                     options={categoriesArray} 
//                     value={category}
//                     onChange={(e, { value}) => setCategory(value)}
                    
//                 />
//             </Card>
//             <Card fluid>
//                 <Dropdown
//                     placeholder='Select Difficulty'
                    
//                     selection
//                     options={difficultyArray} 
//                     value={difficulty}
//                     onChange={(e, { value}) => setDifficulty(value)}
                    
//                 />
//             </Card>
//         </Card.Group>
//         <Segment basic textAlign={"center"}>
//                 <Button compact size='massive'  onClick={getData}>Start Game</Button>
//         </Segment>
//     </Grid.Column>
// </Grid.Row>
// </Grid>