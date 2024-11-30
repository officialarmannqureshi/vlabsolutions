import React from "react";
import { MdTimerOff } from "react-icons/md";
import { MdTimer } from "react-icons/md";
const QuizCardBottom = ({
  createdAt,
  uniqueId,
  className,
  startTime,
  endTime,
}) => {
  return (
    <div className={className}>
      <ul className="ul-quiz-card-bottom">
        <div className="bottom-inner">
          <div className="bottom-inner-icon "><p className="bottom-inner-icon-2">Created At</p></div>
          <p className="bottom-inner-time">
            {new Date(createdAt)
              .toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace("am", "AM")
              .replace("pm", "PM")}
          </p>
        </div>

        <div className="bottom-inner">
          <MdTimer className="bottom-inner-icon" />
          <p className="bottom-inner-time">
            {new Date(startTime)
              .toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace("am", "AM")
              .replace("pm", "PM")}
          </p>
        </div>
        <div className="bottom-inner">
          <MdTimerOff className="bottom-inner-icon" />
          <p className="bottom-inner-time">
            {" "}
            {new Date(endTime)
              .toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace("am", "AM")
              .replace("pm", "PM")}
          </p>
        </div>
      </ul>
    </div>
  );
};

export default QuizCardBottom;
