import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';

function AttemptQuest() {
    const { id } = useParams(); // Get quiz ID from URL
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://localhost:8080/quizzes/${id}`);
                const data = await response.json();
                setQuiz(data);
                setAnswers(data.questionAnswerPairs.map(() => '')); // Initialize answers array
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        const userID = localStorage.getItem('userID'); // Fetch userID from local storage
        if (!userID) {
            alert('User not logged in!');
            return;
        }

        // Calculate result
        const correctAnswers = quiz.questionAnswerPairs.filter(
            (pair, index) => pair.answer.trim().toLowerCase() === answers[index].trim().toLowerCase()
        ).length;
        const totalQuestions = quiz.questionAnswerPairs.length;
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        // Save attempt data
        const attemptData = {
            userID,
            quizID: id,
            answers,
            score,
        };

        try {
            const response = await fetch('http://localhost:8080/attempts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attemptData),
            });
            if (response.ok) {
                alert('Attempt submitted successfully!');
                setResult(score); // Display result

                // Create notification
                const notificationData = {
                    userID,
                    message: `You have completed the quiz with a score of ${score}%`,
                };
                await fetch('http://localhost:8080/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(notificationData),
                });
            } else {
                alert('Failed to submit attempt.');
            }
        } catch (error) {
            console.error('Error submitting attempt:', error);
        }
    };

    if (!quiz) {
        return <p>Loading...</p>;
    }

    return (
        <div className="attempt-quest">
            <SideBar />
            <div className='continSection'>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <h3>Questions</h3>
                {quiz.questionAnswerPairs.map((pair, index) => (
                    <div key={index} className="question">
                        <p>
                            <strong>Q{index + 1}:</strong> {pair.question}
                        </p>
                        <input
                            type="text"
                            placeholder="Your Answer"
                            value={answers[index]}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
                {result !== null && <h3>Your Score: {result}%</h3>}
            </div>
        </div>
    );
}

export default AttemptQuest;
