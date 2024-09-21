import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css';

// Function to shuffle the answers array
const shuffleArray = (array) => {
  let currentIndex = array.length;
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // To store user's selected answers
  const [submitted, setSubmitted] = useState(false);  // To track if quiz is submitted

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: { results } } = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');
      const processedQuestions = results.map(question => {
        const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
        return { ...question, answers };
      });
      setQuestions(processedQuestions);
    };

    fetchQuestions();
  }, []);

  // Handle when the user selects an answer
  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    setUserAnswers(prevState => ({
      ...prevState,
      [questionIndex]: selectedAnswer
    }));
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  return (
    <div className="questions-container">
      {questions.map((questionItem, index) => (
        <div key={index} className="question-item">
          <h2>{questionItem.question}</h2>
          <ul className="answers-list">
            {questionItem.answers.map((answer, idx) => (
              <li key={idx} className={`answer-item`}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={answer}
                    onChange={() => handleAnswerSelect(index, answer)}
                    disabled={submitted} // Disable input after submission
                    checked={userAnswers[index] === answer} // Make sure checked state is preserved
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ul>

          {/* Feedback below each question after submission */}
          {submitted && (
            <div className="feedback">
              {userAnswers[index] === questionItem.correct_answer ? (
                <p className="correct">Your answer is correct!</p>
              ) : (
                <>
                  <p className="wrong">Your answer is wrong!</p>
                  <p className="correct-answer">Correct answer: {questionItem.correct_answer}</p>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Show submit button only before submission */}
      {!submitted && (
        <button onClick={handleSubmitQuiz} className="submit-btn">
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuestionsList;
