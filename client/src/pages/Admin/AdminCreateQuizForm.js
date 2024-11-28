import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const AdminCreateQuiz = (props) => {
  let [quizForm, setquizForm] = useState({
    TotalQuestions: 0,
    ScorePerQuestion: 0,
    SubjectId: null,
    ClassName: null,
    TimeLimit: null,
    startTime: null,
    endTime: null,
  });
  const navigate = useNavigate();

  function handleQuizForm(e) {
    const { name, value } = e.target;
    setquizForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    console.log("Navigating to quiz...");
    console.log(quizForm);
    navigate(`./quiz`);
    if (props.onFormSubmit) {
      props.onFormSubmit(quizForm);
    }
  }

  return (
    <Layout>
      <div className="main-box-quiz">
        <div className="outer-box-quiz">
          <div className="inner-box-quiz">
            <div className="box-quiz">
              <p className="quiz-title-p">Total Questions :</p>
              <input
                type="number"
                name="TotalQuestions"
                onChange={handleQuizForm}
                placeholder="3"
                required
              />
            </div>
            <div className="box-quiz">
              <p className="quiz-title-p">Score per Question :</p>
              <input
                type="number"
                name="ScorePerQuestion"
                placeholder="5"
                onChange={handleQuizForm}
                required
              />
            </div>
            <div className="box-quiz">
              <p className="quiz-title-p">Class Name :</p>
              <input
                type="text"
                name="ClassName"
                placeholder="CSE29"
                onChange={handleQuizForm}
                required
              />
            </div>
            <div className="box-quiz">
              <p className="quiz-title-p">Subject ID :</p>
              <input
                type="text"
                name="SubjectId"
                placeholder="CPP"
                onChange={handleQuizForm}
                required
              />
            </div>

            <div className="box-quiz">
              <p className="quiz-title-p">Time Limit :</p>
              <input
                type="text"
                name="TimeLimit"
                placeholder="Enter time limit (eg; 2.40 2hrs 40min)"
                style={{ width: "23rem" }}
                onChange={handleQuizForm}
                required
              />
            </div>

            <div className="box-quiz">
              <p className="quiz-title-p">Start :</p>
              <input
                type="datetime-local"
                name="startTime"
                style={{ width: "23rem" }}
                onChange={handleQuizForm}
                required
              />

              <p className="quiz-title-p">End :</p>
              <input
                type="datetime-local"
                name="endTime"
                style={{ width: "23rem" }}
                onChange={handleQuizForm}
                required
              />
            </div>

            <Button
              variant="contained"
              color="success"
              className="button-create-quiz"
              onClick={handleSubmit}
            >
              Create Quiz
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCreateQuiz;
