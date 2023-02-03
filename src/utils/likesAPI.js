import tokenService from "./tokenService";

const BASE_URL = "/api";

function create(postId) {
    return fetch(`${BASE_URL}/posts/${postId}/likes`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json());
}

function deleteLike(likeId) {
    return fetch(`${BASE_URL}/likes/${likeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json());
}

export default {
    create,
    deleteLike
};