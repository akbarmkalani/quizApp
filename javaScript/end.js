
 const score = JSON.parse(localStorage.getItem("score"))
  const highScores = JSON.parse(localStorage.getItem("highScores")) || []
   const scoreEle = document.querySelector("p")
   const saveBtn = document.querySelector("button")
   const inp = document.querySelector("input")

    
   scoreEle.innerText = score
    
   const number = [2, , 45, 123, 2, 5, 79]
   const res = number.sort((a,b) => b - a)

   console.log(res);

 const saveHandler = () => {
 if( !inp.value || !score) {
    alert("Invalid username or score")                
 } else{
    const finalScroe = {name: inp.value, score}
      highScores.push(finalScroe)
       highScores.sort((a , b ) => b.score -  a.score ) 
       highScores.splice(10)
        localStorage.setItem("highScores", JSON.stringify(highScores))
        localStorage.removeItem("score")
         window.location.assign("/")
 }
 }

    saveBtn.addEventListener("click" , saveHandler)