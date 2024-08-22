// src/components/QuestionsList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
      .then(response => {
        setQuestions(response.data.results); // Adjust according to your API response structure
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Quiz Questions</h1>
      {questions.map((questionItem, index) => {
        // Combine correct answer with incorrect answers and shuffle them
        const allAnswers = [
          questionItem.correct_answer,
          ...questionItem.incorrect_answers
        ].sort(() => Math.random() - 0.5);

        return (
          <div key={index} className="question-item">
            <h2>{questionItem.question}</h2>
            <ul>
              {allAnswers.map((answer, idx) => (
                <li key={idx}>
                  <label>
                    <input type="radio" name={`question-${index}`} value={answer} />
                    {answer}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;
