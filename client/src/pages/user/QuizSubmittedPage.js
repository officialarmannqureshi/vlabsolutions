import QuizSubmissionSuccess from "./QuizSubmissionSuccess";
const sampleSummary = {
  totalQuestions: 10,
  answered: 8,
  unanswered: 2,
  score: 80,
};
const QuizSubmittedPage = () => {
  return (
    <div className="quiz-submitted-page">
      <QuizSubmissionSuccess summary={sampleSummary} />
    </div>
  );
};

export default QuizSubmittedPage;
