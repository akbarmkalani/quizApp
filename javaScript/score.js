
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const listOl = document.querySelector("ol")


 const content = highScores.map((score, index) => {
                              
        return `
           <li>
                <span>${ index+ 1}</span>
                <p> ${score.name}</p>
                <span> ${score.score} </span>
           </li>
        ` ;
                          
})
 
listOl.innerHTML = content.join("")   