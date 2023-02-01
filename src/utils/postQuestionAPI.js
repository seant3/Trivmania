import tokenService from "./tokenService";

const BASE_URL = "/api/posts";

export function create(data) {
    console.log(data, "create is firing")
    return fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify({data}),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();  // response from the server
        console.log(res, " response from server is firing in API")
        return res.json().then(response => {
            console.log(response, "this is the response from postQuestionAPI")
            throw new Error('Something went wrong in create Post')
        })
    });
}

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            "Authorization": "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}
