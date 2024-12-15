import toast from "react-hot-toast";

import axios from "axios";
export const submitQuiz = async (uniqueId,auth,navigate,markedAnswers) => {
 
    try {
      
      console.log(markedAnswers)
      const res = await axios.post(`/api/v1/auth/quiz/${uniqueId}/submit`, {
        userId: auth.user.id,
        submissionTime: new Date(),
        markedAnswers,
      });

      console.log(res.data);
      toast.success(res.data.message || "Quiz submitted successfully!");
      navigate(`/tests/quiz/${uniqueId}/submitted`);

    } catch (error) {
      console.error(error);
      toast.error("Failed to submit quiz.");
    }
  };