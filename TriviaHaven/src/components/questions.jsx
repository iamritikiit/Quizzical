import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
      .then(response => {
        setQuestions(response.data);
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
      <h1>Questions and Answers</h1>
      <ul>
        {questions.map((item) => (
          <li key={item.id}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
