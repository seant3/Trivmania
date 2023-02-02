import { useState, useEffect } from "react";

import triviaApi from "../../utils/triviaApi";

export default function PlayPage() {

    async function getQuestions() {
        const response = await triviaApi.getQuestions();
        console.log(response, "this is the response from getQuestions")
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (  
        <div></div>
    );
}
