import React, { useState } from 'react';
import css from './Quiz.module.css';
import sprite from '../../img/sprite.svg';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answerIndex, isCorrect) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
      return;
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    });

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      return;
    }
  };

  return (
    <div className={css.wrapper}>
      <h1>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h1>
      <ul className={css.block}>
        <li>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <ul className={css.list}>
            {questions[currentQuestionIndex].answers.map(
              (answer, answerIndex) => (
                <li key={answerIndex}>
                  <button
                    className={css.answer}
                    onClick={() =>
                      handleAnswerClick(answerIndex, answer.isCorrect)
                    }
                    style={
                      selectedAnswers[currentQuestionIndex] !== undefined &&
                      selectedAnswers[currentQuestionIndex] === answerIndex
                        ? {
                            backgroundColor: answer.isCorrect ? 'green' : 'red',
                            color: 'white',
                          }
                        : {}
                    }
                  >
                    {answer.text}
                  </button>
                </li>
              )
            )}
          </ul>
        </li>
      </ul>

      <button onClick={handleNextClick} className={css.button}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Done'}
      </button>

      <div className={css.indicators}>
        <ul>
          {questions.map((question, index) => (
            <li
              key={index}
              className={`${
                selectedAnswers[index] !== undefined
                  ? questions[index].answers[selectedAnswers[index]].isCorrect
                    ? css.correct
                    : css.incorrect
                  : ''
              }`}
              style={{
                backgroundColor:
                  selectedAnswers[index] !== undefined
                    ? questions[index].answers[selectedAnswers[index]].isCorrect
                      ? 'green'
                      : 'red'
                    : '#ccc',
              }}
            >
              <svg
                width="20"
                height="20"
                style={{
                  fill:
                    selectedAnswers[index] !== undefined
                      ? questions[index].answers[selectedAnswers[index]]
                          .isCorrect
                        ? 'white'
                        : 'white'
                      : '#ccc',
                }}
              >
                <use href={`${sprite}#icon-checkmark`}></use>
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
