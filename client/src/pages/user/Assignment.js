import React from "react";

import Layout from "../../components/Layouts/Layout";

const Assignment = () => {
  return (
    <Layout title={"Assignment - Vlab Solutions"}>
      <div className="assignment-container-main">
        <div className="assignment-container mt-3">
          <div className="assign-dashboard">
            <p className="assignment-title">Total Assigned</p>
            <p className="assignment-total">00</p>
            <p className="assignment-status">updated today</p>
          </div>
          <div className="assign-dashboard">
            <p className="assignment-title">Total Pending</p>
            <p className="assignment-total">00</p>
            <p className="assignment-status">updated today</p>
          </div>
          <div className="assign-dashboard-3 ">
            <p className="assignment-title">Total Submitted</p>
            <p className="assignment-total">00</p>
            <p className="assignment-status">updated today</p>
          </div>
        </div>

        <div className="assignments-detail-container">
          <div className="col">
            <div className="row">
              <div className="assignment-small-container-1">
                <p className="assignment-name">C programming 10 Questions</p>
                <p className="assignment-date">uploaded on 18-07-2023</p>
              </div>
              <div className="assignment-small-container-2">
                <div className="assignment-status">Pending</div>
                <button className="assignment-download">Download</button>
              </div>
            </div>

            <div className="row">
              <div className="assignment-small-container-1">
                <p className="assignment-name">C programming 10 Questions</p>
                <p className="assignment-date">uploaded on 18-07-2023</p>
              </div>
              <div className="assignment-small-container-2">
                <div className="assignment-status">Pending</div>
                <button className="assignment-download">Download</button>
              </div>
            </div>
            <div className="row">
              <div className="assignment-small-container-1">
                <p className="assignment-name">C programming 10 Questions</p>
                <p className="assignment-date">uploaded on 18-07-2023</p>
              </div>
              <div className="assignment-small-container-2">
                <div className="assignment-status">Pending</div>
                <button className="assignment-download">Download</button>
              </div>
            </div>
            <div className="row">
              <div className="assignment-small-container-1">
                <p className="assignment-name">C programming 10 Questions</p>
                <p className="assignment-date">uploaded on 18-07-2023</p>
              </div>
              <div className="assignment-small-container-2">
                <div className="assignment-status">Pending</div>
                <button className="assignment-download">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assignment;
