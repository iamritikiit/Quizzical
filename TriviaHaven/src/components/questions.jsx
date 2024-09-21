import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css';

// Inline shuffle function
const shuffleArray = (array) => {
  let currentIndex = array.length;
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Swap with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: { results } } = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');

      // Directly combine and shuffle answers in one step
      const processedQuestions = results.map(question => {
        const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
        return { ...question, answers };
      });

      setQuestions(processedQuestions);
    };

    fetchQuestions();
  }, []);

  return (
    <div className="questions-container">
      {questions.map((questionItem, index) => (
        <div key={index} className="question-item">
          <h2>{questionItem.question}</h2>
          <ul className="answers-list">
            {questionItem.answers.map((answer, idx) => (
              <li key={idx} className="answer-item">
                {answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
