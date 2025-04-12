import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyQuest() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const userID = localStorage.getItem('userID'); // Get the logged-in user's ID

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:8080/quizzes');
                const data = await response.json();
                // Filter quizzes to only include those created by the logged-in user
                const userQuizzes = data.filter((quiz) => quiz.userID === userID);
                setQuizzes(userQuizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, [userID]);

    const deleteQuiz = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/quizzes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Quiz deleted successfully!');
                setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
            } else {
                alert('Failed to delete quiz.');
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div className="all-quest">
            <button onClick={() => (window.location.href = '/addQuest')}>Add Quest</button>
            <h2>My Quizzes</h2>
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <h4>Questions and Answers:</h4>
                        <ul>
                            {(quiz.questionAnswerPairs || []).map((pair, index) => (
                                <li key={index}>
                                    <strong>Q:</strong> {pair.question} <br />
                                    <strong>A:</strong> {pair.answer}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => deleteQuiz(quiz.id)}>Delete Quiz</button>
                        <button onClick={() => navigate(`/updateQuest/${quiz.id}`)}>Update Quiz</button>
                    </div>
                ))
            ) : (
                <p>No quizzes available.</p>
            )}
        </div>
    );
}

export default MyQuest;
