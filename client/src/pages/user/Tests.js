import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import SearchBox from "../../components/AdminViewQuiz/SearchBox";
import SortBox from "../../components/AdminViewQuiz/SortBox";
import QuizViewBox from "../../components/AdminViewQuiz/QuizViewBox";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Tests = () => {
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const [statusData, setStatusData] = useState({
    totalAssigned: 0,
    totalPending: 0,
    totalSubmitted: 0,
  });

  const [status,setStatus] = useState("");

  const [quizData, setQuizData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [sortRecent, setSortRecent] = useState(false);
  const navigate = useNavigate();
  console.log(status);
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
      
        const res = await axios.get("/api/v1/auth/getQuizData", {
          params: { userId }, 
        });
   
        setQuizData(res.data.updatedQuizData
        );
        setFilteredData(res.data.updatedQuizData
        );
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        toast.error("Failed to load quiz data.");
      }
    };
    fetchQuizData();
  }, []);

  useEffect(() => {
    const totalQuizzes = quizData.length;

    const completedQuizzes = quizData.filter(
      (quiz) => quiz.completed === true
    ).length;
    const notCompletedQuizzes = totalQuizzes - completedQuizzes;

    setStatusData({
      totalAssigned: totalQuizzes,
      totalPending: notCompletedQuizzes,
      totalSubmitted: completedQuizzes,
    });
  }, [quizData]);

  useEffect(() => {
    let filtered = quizData;

    if (searchItem) {
      filtered = filtered.filter((item) =>
        item.formDetails.SubjectId.toLowerCase().includes(
          searchItem.toLowerCase()
        )
      );
    }

    if (searchDate) {
      filtered = filtered.filter(
        (item) => item.createdAt.slice(0, 10) === searchDate
      );
    }

    if (sortRecent) {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if(status){
     
      if(status === 'submitted'){
        filtered = [...filtered].filter(
          (item) => item.completed === true
        );
      }
      if(status === 'expired'){
        filtered = [...filtered].filter(
          (item) => item.expired === true && item.completed === false
        );
      }
      if(status === 'pending'){
        filtered = [...filtered].filter(
          (item) => item.completed === false && item.expired === false
        );
      }
      
    }

    setFilteredData(filtered);
  }, [searchItem, searchDate, quizData, sortRecent,status]);

  const handleStartQuiz = async (uniqueId, startTime, endTime) => {
    try {
      const userId = auth.user.id;
      const res = await axios.get(
        `/api/v1/auth/quiz/${uniqueId}/status/${userId}`
      );

      if (!res.data.completed) {
        navigate(
          `/tests/quiz/${uniqueId}?startTime=${startTime}&endTime=${endTime}`
        );
        toast.success("Quiz started");
      } else {
        console.log("You have already submitted this quiz.");
        toast.error("You have already submitted this quiz.");
        return;
      }
    } catch (error) {
      console.error("Error checking submission status:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="tests-main-container">
        <div className="assignment-container mt-3">
          <div className="assign-dashboard">
            <p className="assignment-title">Total Assigned</p>
            <p className="assignment-total">{statusData.totalAssigned}</p>
            <p className="assignment-status">Last updated today</p>
          </div>
          <div className="assign-dashboard">
            <p className="assignment-title">Total Pending</p>
            <p className="assignment-total">{statusData.totalPending}</p>
            <p className="assignment-status">Last updated today</p>
          </div>
          <div className="assign-dashboard">
            <p className="assignment-title">Total Submitted</p>
            <p className="assignment-total">{statusData.totalSubmitted}</p>
            <p className="assignment-status">Last updated today</p>
          </div>
        </div>

        <div className="tests-main-container-inner">
          <SearchBox
            setSearchItem={setSearchItem}
            data={quizData}
            filterItem={filteredData}
          />
          <SortBox
            setSearchDate={setSearchDate}
            data={filteredData}
            orgData={quizData}
            setSortRecent={setSortRecent}
            setStatus={setStatus}
            userRole={auth?.user?.role}
          />
          <QuizViewBox
            quizData={filteredData}
            handleStartQuiz={(uniqueId, startTime, endTime) =>
              handleStartQuiz(uniqueId, startTime, endTime)
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default Tests;
