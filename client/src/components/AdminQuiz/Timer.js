import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router";
import { submitQuiz } from "../../functions/SubmitQuiz";

const Timer = ({ durationInMinutes, startedTime, endedTime, uniqueId,markedAnswers }) => {
  const [auth] = useAuth();
  const [timeLeft, setTimeLeft] = useState(null); 
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    if (endedTime) {
      const currentTime = new Date();
      const difference = Math.floor((new Date(endedTime) - currentTime) / 1000);
      return Math.max(difference, 0); // Ensure no negative time
    }
    return durationInMinutes * 60;
  };

  useEffect(() => {
    // Set the initial timeLeft only when endedTime is available
    if (endedTime) {
      const initialTimeLeft = calculateTimeLeft();
      setTimeLeft(initialTimeLeft);
      console.log("Initial timeLeft set to:", initialTimeLeft);
    }
  }, [endedTime, durationInMinutes]);

  useEffect(() => {
    // Timer countdown logic
    if (timeLeft !== null) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleTimeUp = async () => {
      try {
        const userId = auth?.user?.id;
        if (!userId) {
          toast.error("User not authenticated. Cannot submit quiz.");
          return;
        }

        const res = await axios.get(
          `/api/v1/auth/quiz/${uniqueId}/status/${userId}`
        );

        if (!res.data.completed) {
          toast("Time is up! Submitting your quiz...");
          await submitQuiz(uniqueId, auth, navigate,markedAnswers);
        } else {
          toast.error("Quiz already submitted.");
        }
      } catch (error) {
        console.error("Error checking quiz status:", error);
      }
    };

    if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, uniqueId, auth, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (timeLeft === null) {
    return <div className="timer-css">Loading timer...</div>; // Handle loading state
  }

  return <div className="timer-css">Time Left: {formatTime(timeLeft)}</div>;
};

export default Timer;
