import React, { useState } from 'react';
import './quest.css';

function AddQuest() {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questionAnswerPairs: [{ question: '', answer: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...quiz.questionAnswerPairs];
    updatedPairs[index][field] = value;
    setQuiz({ ...quiz, questionAnswerPairs: updatedPairs });
  };

  const addQuestionAnswerPair = () => {
    setQuiz({
      ...quiz,
      questionAnswerPairs: [...quiz.questionAnswerPairs, { question: '', answer: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID'); // Fetch userID from local storage
    if (!userID) {
      alert('User not logged in!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quiz, userID }), // Include userID in the payload
      });
      if (response.ok) {
        alert('Quiz added successfully!');
        setQuiz({ title: '', description: '', questionAnswerPairs: [{ question: '', answer: '' }] });
      } else {
        alert('Failed to add quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-quest">
      <h2>Add Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Quiz Description"
          value={quiz.description}
          onChange={handleChange}
          required
        />
        <h3>Questions and Answers</h3>
        {quiz.questionAnswerPairs.map((pair, index) => (
          <div key={index} className="question-answer-pair">
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={pair.question}
              onChange={(e) => handlePairChange(index, 'question', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={pair.answer}
              onChange={(e) => handlePairChange(index, 'answer', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addQuestionAnswerPair}>
          Add Question and Answer
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddQuest;
