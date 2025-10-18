import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  useEffect(() => {
    // set up a timer that decreases the counter every 1 second
    const timeout = setTimeout(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    // when timer hits 0, call onAnswered(false)
    if (secondsRemaining === 0) {
      onAnswered(false);
    }

    // cleanup: clear timeout on unmount or next effect run
    return () => clearTimeout(timeout);
  }, [secondsRemaining, onAnswered]);

  return (
    <div className="question">
      <h1>{question.prompt}</h1>
      <p>{secondsRemaining} seconds remaining</p>
      <div className="answers">
        {question.answers.map((answer) => (
          <button
            key={answer}
            onClick={() => onAnswered(answer === question.correctAnswer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;