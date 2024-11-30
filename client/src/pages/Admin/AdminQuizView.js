import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import SearchBox from "../../components/AdminViewQuiz/SearchBox";
import SortBox from "../../components/AdminViewQuiz/SortBox";
import QuizViewBox from "../../components/AdminViewQuiz/QuizViewBox";
import axios from "axios";
const AdminQuizView = () => {
    const [quizData,setQuizData]=useState([]);
    
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const res = await axios.get('/api/v1/auth/getQuizData');
                setQuizData(res.data.quizData); // Set the state to the fetched data
            } catch (error) {
                console.error("Error fetching quiz data:", error); // Handle errors
            }
        };

        fetchQuizData(); // Call the async function

    }, []);

    


  return (
    <Layout>
      <div className="container-fluid" style={{ height: "auto" }}>
        <div className="row mt-3 ">
          <div className="col-md-3 admin-menu-css">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-view">
            <SearchBox></SearchBox>
            <SortBox></SortBox>
            <QuizViewBox quizData={quizData}></QuizViewBox>
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default AdminQuizView;
