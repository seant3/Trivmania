import { useState, Component } from "react";
import { Menu, Grid, Header } from "semantic-ui-react";

import Answer from "../Answer/Answer";

export default function AnswerDisplay({ allChoices, verifyAnswer, isCorrect }) {
  const questionJsx = allChoices.map((answer) => {
    return (
      <Answer
        key={answer}
        choice={answer}
        verifyAnswer={verifyAnswer}
        isCorrect={isCorrect}
      />
    );
  });

  return <>{questionJsx}</>;
}
