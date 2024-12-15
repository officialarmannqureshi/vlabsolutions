export const CountSubmittedQuiz = (data) => {
    let count = 0; 
  
    try {
      for (const d of data) { 
        if (d.submissionTime && d.completed) { 
          count++; 
        }
      }
      return count; 
    } catch (error) {
      console.log({
        message: "Error in count submitted quiz function",
        error,
      });
      return 0; 
    }
  };
  