import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const QuizSubmissionSuccess = ({ summary }) => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleBackToDashboard = () => {
    navigate("/"); 
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === "") {
      alert("Please enter your feedback before submitting!");
      return;
    }
   
    console.log("Feedback submitted:", feedback);

    setSubmittedFeedback(true);
    setFeedback(""); 
  };

  return (
    <div className="quiz-submission-success">
      <div className="success-animation">🎉</div>
      <h1 className="success-title">Quiz Submitted Successfully!</h1>
      <p className="success-description">
        Thank you for completing the quiz. Here's your performance summary:
      </p>
      <div className="quiz-summary">
        <div className="summary-item">
          <span className="label">Total Questions:</span>
          <span className="value">{summary.totalQuestions}</span>
        </div>
        <div className="summary-item">
          <span className="label">Answered:</span>
          <span className="value">{summary.answered}</span>
        </div>
        <div className="summary-item">
          <span className="label">Unanswered:</span>
          <span className="value">{summary.unanswered}</span>
        </div>
        <div className="summary-item">
          <span className="label">Your Score:</span>
          <span className="value">{summary.score}</span>
        </div>
      </div>

      <div className="feedback-section">
        {!submittedFeedback ? (
          <>
            <h2>We'd love your feedback!</h2>
            <textarea
              className="feedback-textarea"
              placeholder="Tell us about your experience with Vlab Solutions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              className="feedback-submit-btn"
              onClick={handleFeedbackSubmit}
            >
              Submit Feedback
            </button>
          </>
        ) : (
          <p className="thank-you-message">Thank you for your feedback! 😊</p>
        )}
      </div>

      <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default QuizSubmissionSuccess;
