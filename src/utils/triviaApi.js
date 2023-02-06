const BASE_URL = 'https://opentdb.com/api.php?amount=1';

function getQuestions(category, difficulty) {
    console.log(category, difficulty, "<<<API category and difficulty")
    console.log(`${BASE_URL}&category=${category}&difficulty=${difficulty}`)
    return fetch(`${BASE_URL}&category=${category}&difficulty=${difficulty}`, {
      }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials!')
      })
}


export default{
    getQuestions,
}