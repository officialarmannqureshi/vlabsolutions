import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";

const SortBox = ({ setSearchDate, data, orgData,setStatus,setSortRecent,userRole }) => {

  const handleDate = (e) => {
    const selectedDate = e.target.value; 
    setSearchDate(selectedDate);
  };

  const handleStatus = (e)=>{
    const selectedStatus = e.target.value; 
    setStatus(selectedStatus);
  }

  const toggleSortRecent = () => setSortRecent((prev) => !prev);
  return (
    <div className="container-quiz-view-2">
      <div className="Status-box">
        <CiFilter />
        <label>Status:</label>
        <select className="select-status-quiz-view" onChange={handleStatus}>
          {
            userRole? (<>
            <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
            </>):(<>
              <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="expired">Expired</option>
            </>)
          }
          
        </select>
      </div>
      <div className="line-css"></div>
      <div className="sortBy-css">
        <label htmlFor="CreatedDate" className="CreatedDate-css">
          Sort By: Created Date
        </label>
        <input
          type="date"
          id="CreatedDate"
          name="CreatedDate"
          placeholder="Created Date"
          onChange={handleDate}
        />
      </div>
      <div className="recent-sort-css" onClick={toggleSortRecent}>
        <FaArrowUp className="recent-sort-css-inner" />
      </div>
    </div>
  );
};

export default SortBox;
