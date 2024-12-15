import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth";
const SearchBox = ({ setSearchItem, data, filterItem,className }) => {
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth();
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchItem(searchValue);
  };

  const handleClick = () => {
    navigate(`/admin/create-quiz`);
  };

  return (
    <div className={`top-search-bar ${className}`}>
      <input
        type="text"
        placeholder="Search Quiz"
        className="searchbox"
        onChange={handleSearch}
      />
      {auth?.user?.role === 1 ? (<button className="create-quiz-btn2" onClick={handleClick}>
        Create Quiz
      </button>):<></>}
      
    </div>
  );
};

export default SearchBox;
