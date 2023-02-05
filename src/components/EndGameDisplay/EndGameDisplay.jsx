import { Button } from "semantic-ui-react"

import PlayPage from "../../pages/PlayPage/PlayPage";

export default function ScoreDisplay({ points, handleAddPost, category, difficulty }) {

    function handleOnClick(e) {
        e.preventDefault();
        
        console.log(points, "this is the handleSubmit from user input")
        handleAddPost({
            points: points,
            category: category,
            difficulty: difficulty
        });
    }

    return (
        <>
            <div>Your Score is: {points}</div>
            <Button onClick={handleOnClick} type="submit" className="btn">
                        Post Your Score
            </Button>
            <Button onClick={<PlayPage />} type="submit" className="btn">
                        Play Again!
            </Button>
        </>
    )
}