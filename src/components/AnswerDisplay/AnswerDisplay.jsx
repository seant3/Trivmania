import { useState, Component } from "react"
import { Menu } from "semantic-ui-react"

export default function AnswerDisplay({allChoices}) {
    const [userAnswer,setUserAnswer] = useState("")
    
    function handleClickEvent(e, { name }) {
        setUserAnswer(name)
    }

    return (
        <Menu fluid pointing vertical>
            <Menu.Item
                key={allChoices[0]}
                name={allChoices[0]}
                active={userAnswer === allChoices[0]}
                onClick={handleClickEvent}
            />
            <Menu.Item
                key={allChoices[1]}
                name={allChoices[1]}
                active={userAnswer === allChoices[1]}
                onClick={handleClickEvent}
            />
            <Menu.Item
                key={allChoices[2]}
                name={allChoices[2]}
                active={userAnswer === allChoices[2]}
                onClick={handleClickEvent}
            />
            <Menu.Item
                key={allChoices[3]}
                name={allChoices[3]}
                active={userAnswer === allChoices[3]}
                onClick={handleClickEvent}
            />
        </Menu>
    )
}