import { useState, useEffect } from "react";

import triviaApi from "../../utils/triviaApi";

export default function PlayPage() {
    const [question, setQuestion] = useState([])

    async function getQuestions() {
        const response = await triviaApi.getQuestions();
        console.log(response.results[0], "this is the response from getQuestions")
        setQuestion(response.results.question)
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (  
        <div></div>
    );
}
