import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import SearchBox from "../../components/AdminViewQuiz/SearchBox";
import SortBox from "../../components/AdminViewQuiz/SortBox";
import QuizViewBox from "../../components/AdminViewQuiz/QuizViewBox";
import axios from "axios";

const AdminQuizView = () => {
  const [quizData, setQuizData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [status, setStatus] = useState("");
  const [sortRecent,setSortRecent]=useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get("/api/v1/auth/getQuizData");
        setQuizData(res.data.updatedQuizData); // Set fetched data
        setFilteredData(res.data.updatedQuizData); // Sync filteredData
      } catch (error) {
        console.error("Error fetching quiz data:", error); // Handle errors
      }
    };
    fetchQuizData();
  }, []);
  

  useEffect(() => {
    let filtered = quizData;

    if (searchItem) {
      filtered = filtered.filter((item) =>
        item.formDetails.SubjectId.toLowerCase().includes(searchItem.toLowerCase())
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

    

    setFilteredData(filtered);
  }, [searchItem, searchDate, quizData,sortRecent]);

  return (
    <Layout>
      <div className="container-fluid" style={{ height: "auto" }}>
        <div className="row mt-3">
          <div className="col-md-3 admin-menu-css">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-view">
            <SearchBox
              setSearchItem={setSearchItem}
              data={quizData}
              filterItem={filteredData}
            />
            <SortBox
              setSearchDate={setSearchDate}
              data={filteredData}
              orgData={quizData}
              setStatus={setStatus}
              setSortRecent={setSortRecent}
            />
            <QuizViewBox quizData={filteredData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminQuizView;
