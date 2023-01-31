import tokenService from "./tokenService";

const BASE_URL = "/api/posts";

export function create(postQuestion) {
    return fetch(BASE_URL, {
        method: "POST",
        body: postQuestion,
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();  // response from the server
        return res.json().then(response => {
            console.log(response, "this is the response from postQuestionAPI")
            throw new Error(response.err)
        })
    });
}