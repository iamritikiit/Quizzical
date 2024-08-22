import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css'; 

const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
  const allAnswers = [correctAnswer, ...incorrectAnswers];
  return allAnswers.sort(() => Math.random() - 0.5);
};

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple'
        );
        setQuestions(response.data.results);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedAnswer,
    });
  };

  const handleSubmit = () => {
    let score = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        score += 1;
      }
    });

    alert(`You scored ${score} out of ${questions.length}`);
  };

  if (loading) return <p className="loading">Loading questions...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Questions</h1>
      {questions.map((questionItem, index) => {
        const shuffledAnswers = shuffleAnswers(
          questionItem.correct_answer,
          questionItem.incorrect_answers
        );

        return (
          <div key={index} className="question-item">
            <h2 dangerouslySetInnerHTML={{ __html: questionItem.question }} className="question-text" />
            <ul className="answers-list">
              {shuffledAnswers.map((answer, idx) => (
                <li key={idx} className="answer-item">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={answer}
                      onChange={() => handleAnswerChange(index, answer)}
                      className="answer-input"
                    />
                    <span dangerouslySetInnerHTML={{ __html: answer }} className="answer-text" />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
    </div>
  );
};

export default QuestionsList;
