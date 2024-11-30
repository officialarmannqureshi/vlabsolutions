import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
const SortBox = () => {
  return (
    <div className="container-quiz-view-2">
      <div className="Status-box">
        <CiFilter />
        <select className="select-status-quiz-view">
          <option value="all">Status: All</option>
          <option value="draft">Status: Draft</option>
          <option value="published">Status: Published</option>
        </select>
      </div>
      <div className="line-css"></div>
      <div className="sortBy-css">
        <label for="CreatedDate" className="CreatedDate-css">
          Sort By: Created Date
        </label>
        <input
          type="date"
          id="CreatedDate"
          name="CreatedDate"
          placeholder="Created Date"
        ></input>
      </div>
      <div className="recent-sort-css">
        <FaArrowUp className="recent-sort-css-inner" />
      </div>
    </div>
  );
};

export default SortBox;
