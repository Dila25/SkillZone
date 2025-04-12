import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './quest.css';

function UpdateQuest() {
  const { id } = useParams(); // Get quiz ID from URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questionAnswerPairs: [{ question: '', answer: '' }],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:8080/quizzes/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);

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

  const removeQuestionAnswerPair = (index) => {
    const updatedPairs = quiz.questionAnswerPairs.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questionAnswerPairs: updatedPairs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        alert('Quiz updated successfully!');
        navigate('/allQuest');
      } else {
        alert('Failed to update quiz.');
      }
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className="update-quest">
      <h2>Update Quiz</h2>
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
            <button type="button" onClick={() => removeQuestionAnswerPair(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestionAnswerPair}>
          Add Question and Answer
        </button>
        <button type="submit">Update Quiz</button>
      </form>
    </div>
  );
}

export default UpdateQuest;
