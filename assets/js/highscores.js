//highscores variables
let olEl = document.getElementById('scoreList');
let clearScoresBtn = document.getElementById('clearScores');

function displayScores() {
    console.log('displayScores');
    // Retrieve array of scores saved same as savedScore Function
    let savedScores = JSON.parse(localStorage.getItem('highscores'));
    
    // if statement
  if (!savedScores) {
    olEl.textContent = 'There are no score saved  yet.';
    return;
  }

// Sort scores in descending order
savedScores.sort(function (a,b) {
    return b.score - a.score;
});

console.log(savedScores);
 // loop through array of scores to create li tag for score each score ad display
 for (let i = 0; i < savedScores.length; i += 1) {
    var liTag = document.createElement('li');
    liTag.textContent = savedScores[i].initials + ' - ' + savedScores[i].score
    olEl.appendChild(liTag);
 }
}

// event listener to clear scores button
clearScoresBtn.addEventListener('click', function () {
    localStorage.removeItem('highscores');
    window.location.reload();
});

//Display scores loading page
displayScores();