import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';


const GetExam = () => {
  const { id: examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/exam/${examId}`);
        const { exam: examData, questions: questionData } = res.data;
        setExam(examData);
        setQuestions(questionData);

        setTimeLeft(parseInt(examData.duration) * 60);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
        if (submitted) return; // Prevent multiple submissions

        try {
            const res = await axios.post('http://localhost:5000/api/exams/submit-exam', {
                examId,
                answers,
                email,
            });
            setResult(res.data);
            setSubmitted(true);
            alert("Your Exam was submitted successfully. Result will be declared soon.");
            window.location.href = '/userDashboard';
        } catch (err) {
            console.error('Error submitting exam:', err);
            setError(err.response?.data?.error || 'Failed to submit exam');
        }
    };
  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  if (!exam || !questions.length) {
    return <div className="text-center m-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{exam.title}</h2>
      <div className="mb-3">
        <p><strong>Duration:</strong> {exam.duration} minutes</p>
        <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
        <p><strong>Passing Marks:</strong> {exam.passingMarks}</p>
        <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
      </div>

      {submitted && result ? (
        <div className="alert alert-info">
          <h4>Exam Results</h4>
          <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
          <p><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</p>
          <h5>Answer Details:</h5>
          <ul>
            {result.results.map((res, index) => (
              <li key={index}>
                <strong>Question {index + 1}:</strong> {res.question}<br />
                <strong>Your Answer:</strong> {res.selectedAnswer || 'Not answered'}<br />
                <strong>Correct Answer:</strong> {res.correctAnswer}<br />
                <strong>Result:</strong> {res.isCorrect ? 'Correct' : 'Incorrect'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((q, index) => (
            <div key={q._id} className="card mb-3">
              <div className="card-body">
                <h5>Question {index + 1}: {q.question}</h5>
                <div className="form-check">
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={q.optionA}
                    checked={answers[q._id] === q.optionA}
                    onChange={() => handleAnswerChange(q._id, q.optionA)}
                    className="form-check-input"
                    id={`optionA-${q._id}`}
                    disabled={submitted}
                  />
                  <label className="form-check-label" htmlFor={`optionA-${q._id}`}>
                    {q.optionA}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={q.optionB}
                    checked={answers[q._id] === q.optionB}
                    onChange={() => handleAnswerChange(q._id, q.optionB)}
                    className="form-check-input"
                    id={`optionB-${q._id}`}
                    disabled={submitted}
                  />
                  <label className="form-check-label" htmlFor={`optionB-${q._id}`}>
                    {q.optionB}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={q.optionC}
                    checked={answers[q._id] === q.optionC}
                    onChange={() => handleAnswerChange(q._id, q.optionC)}
                    className="form-check-input"
                    id={`optionC-${q._id}`}
                    disabled={submitted}
                  />
                  <label className="form-check-label" htmlFor={`optionC-${q._id}`}>
                    {q.optionC}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={q.optionD}
                    checked={answers[q._id] === q.optionD}
                    onChange={() => handleAnswerChange(q._id, q.optionD)}
                    className="form-check-input"
                    id={`optionD-${q._id}`}
                    disabled={submitted}
                  />
                  <label className="form-check-label" htmlFor={`optionD-${q._id}`}>
                    {q.optionD}
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary" disabled={submitted}>
            Submit Exam
          </button>
        </form>
      )}
    </div>
  );
};

export default GetExam;