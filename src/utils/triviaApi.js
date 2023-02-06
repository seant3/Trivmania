const BASE_URL = "https://opentdb.com/api.php?amount=10";

function getQuestions(category, difficulty) {
  return fetch(
    `${BASE_URL}&category=${category}&difficulty=${difficulty}`,
    {}
  ).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials!");
  });
}

export default {
  getQuestions,
};
