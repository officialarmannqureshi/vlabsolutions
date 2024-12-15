export const countSubmitted = (data)=>{
    let count=0;
    Object.entries(data).forEach(([QuizId,value])=>{
        if(value.completed){
            count++;
        }
    });

    return count;
}