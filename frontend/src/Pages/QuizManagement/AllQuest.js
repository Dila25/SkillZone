import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllQuest() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:8080/quizzes');
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="all-quest">
            <h2>All Quizzes</h2>
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>


                        <button onClick={() => navigate(`/attemptQuest/${quiz.id}`)}>Attempt Quiz</button>
                    </div>
                ))
            ) : (
                <p>No quizzes available.</p>
            )}
        </div>
    );
}

export default AllQuest;
