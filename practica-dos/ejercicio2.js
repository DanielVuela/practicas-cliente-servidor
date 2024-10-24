// 1
function getAverage(scores) {
  return scores.reduce((a, b) =>  a + b, 0)/scores.length;
  }
  
  console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
  console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

  // 2
  function getGrade(score) {
    if(score === 100) return "A++";
    if(score >= 90) return "A";
    if(score >= 80) return "B";
    if(score >= 70) return "C";
    if(score >= 60) return "D";
    return "F"
   }
   
   console.log(getGrade(96));
   console.log(getGrade(82));
   console.log(getGrade(56));

   // 3 
   function hasPassingGrade(score) {
    return getGrade(score) !== "F";
  }
  
  
  console.log(hasPassingGrade(100));
  console.log(hasPassingGrade(53));
  console.log(hasPassingGrade(87));


  // 4

  function studentMsg(totalScores, studentScore) {
    const studentGrade = getGrade(studentScore);
    return `Class average: ${getAverage(totalScores)}. Your grade: ${studentGrade}. ${studentGrade === "F"? "You failed the course." : "You passed the course."}`;
  }
  console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
