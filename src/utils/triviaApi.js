import tokenService from './tokenService';

const BASE_URL = 'https://opentdb.com/api.php?amount=10';

function getQuestions() {
    return fetch(BASE_URL, {
      }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials!')
      })
}


export default{
    getQuestions,
}