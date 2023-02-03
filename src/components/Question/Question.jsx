import { Menu, Grid, Header } from "semantic-ui-react"

export default function Question({verifyAnswer, choice, isCorrect}) {
    if(isCorrect.answer === "") {
        return (
            <Menu.Item
                    key={choice}
                    name={choice}
                    onClick={verifyAnswer}
                    color="blue"
                    active={false}
                />
        )
    }
    const color = isCorrect.answer === choice ? "green" : "red";

    return (
        <Menu.Item
                key={choice}
                name={choice}
                onClick={verifyAnswer}
                color={color}
                active={true}
            />
    )
}