import React from "react";
import { useNavigate } from "react-router";

const SearchBox = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate(`/admin/create-quiz`)
  }
  return (
    <div className="top-search-bar">
      <input type="text" placeholder="Search Quiz" className="searchbox" />
      <button className="create-quiz-btn2" onClick={handleClick}>
        Create Quiz
      </button>
    </div>
  );
};

export default SearchBox;
