import { Button } from "semantic-ui-react"

export default function ScoreDisplay({ points, handleAddPost, category, difficulty, setIsPlaying }) {

    function handleOnClick(e) {
        e.preventDefault();
        
        console.log(points, "this is the handleSubmit from user input")
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
        <>
            <div>Your Score is: {points}</div>
            <Button onClick={handleOnClick} type="submit" className="btn">
                        Post Your Score
            </Button>
            <Button onClick={resetGame} type="submit" className="btn">
                        Play Again!
            </Button>
        </>
    )
}