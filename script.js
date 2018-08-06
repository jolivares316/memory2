

let tileImages = ['tile1.png', 'tile2.png', 'tile3.png', 'tile4.png', 'tile5.png', 'tile6.png'];
let gameboard = document.getElementById("gameboard");
let messageTop = document.getElementById("message");
let buttonmessage = document.getElementById("gameControl");
let myTime = document.getElementById("myTime");
let cardsFlippedOver = 0;
let lastCardPicked = -1;
let solutionArray = tileImages.concat(tileImages);
let flipTimer = '';
let score = 0;
let messageTimer = '';  //message interval
let seconds = 0, mseconds = 0, minutes = 0, hours =0, t, gameScore = 100;  //for timer
let modal = document.querySelector(".modal");  // resources from sabe.io
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");
let moves = 0;
let winningTime = document.querySelector(".winning-time");
let winningMoves = document.querySelector(".winning-moves");
//let finalStar = document.querySelector(".final-star");
let restart = document.querySelector(".restart");
let stars = document.querySelector(".stars");



// used sabe.io tutoral for Modal box
function toggleModal() {
  modal.classList.toggle("show-modal");
  document.querySelector(".close-button").addEventListener("click", reload);
  //document.querySelector(".gameControl").addEventListener("click", resetGame);
  winningMoves.innerHTML = "Moves: " + moves;  // displays moves on modal
  let mStars = document.querySelector('.stars');
  let mContent= document.querySelector('.modal-content');
  const pStar = document.createElement('div');  //creates div on modal
  pStar.className = "rating";     //assings class to new div
  pStar.innerHTML = "<p>Stars Score: </p>";
  pStar.appendChild(mStars);
  mContent.insertBefore(pStar, buttonmessage);
  stopClock();
  //let woohoo = document.querySelector('.stars');
  //let ohYeah= document.querySelector('.modal-content');
  //ohYeah.appendChild(woohoo);
  //document.getElementById("gameControl").addEventListener("click", startGame);
  //document.getElementById("gameControl").addEventListener("click", toggleModal);
  //document.getElementById("gameControl").addEventListener("click", resetGame);
  //document.getElementById("gameControl").addEventListener("click", resetStars);
  //document.querySelector(".restart").addEventListener("click", resetGame);
  //document.getElementById("gameControl").addEventListener("click", res);
  //moves= 0;
  //star.style.display = 'inline';
}


// to show  or hide modal
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
    resetGame();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
//window.addEventListener("click", windowOnClick);

//udemy memory game course referenced

flipArray = new Array();
//console.log(solutionArray);
//console.log(solutionArray);
//console.log(tileImages);
startGame();


//stars game
function startGame() {
  /// Clear Gameboard
  //clearInterval(flipTimer);
  timerClock();
  resetStars();
  moves = 0;
  checkScore();
  seconds = 0, mseconds = 0, minutes = 0, hours =0; gameScore = 100; //bring all to zero at start
  shuffleArray(solutionArray);
  score = 0;
  gameboard.innerHTML = "";
  /// Gameboard create
  buttonmessage.innerHTML = "Restart Game";
  messageText("Click a Tile to start")
  for (let i=0; i <= ((solutionArray.length)-1); i++) {
    gameboard.innerHTML += '<div class="deck"><img id="cardOpen'+i+'" src="Images/wc-logo.jpg" onclick="pickCard(\''+solutionArray[i]+'\',\''+i+'\',this);return false;" class="images"> </div>';
  }
}

//picking card

function pickCard(a, b, c){
  //console.log(c);
  if(cardsFlippedOver < 2 && lastCardPicked != b) {
    flipArray[cardsFlippedOver] = solutionArray [b];
    flipArray[(cardsFlippedOver) + 2] = c.id;
  cardsFlippedOver++;
  c.src = 'images/'+solutionArray[b];
    if(cardsFlippedOver == 2) {
      if(flipArray[0] === flipArray[1]) {
        messageText("GOOOOOOOOOOOOOL!");
        //console.log('same');
        pickAgain();
        score++;
        //check if game over
        if (tileImages.length <= score) {
          console.log('Game Over!');
          gameDone ();
          stopClock ();
          //toggleModal();
        }
      } else {
        //hideCard();
        //gives users time to see cards before they flip back
        flipTimer = setInterval(hideCard, 1000);
        //console.log('different');
        messageText("MISSED!!");
      }
    }
    lastCardPicked = b;
  }
  // to find out if they are different
  // console.log(flipArray)
}

//message while playing
function messageText(message) {
  clearInterval(messageTimer);
  console.log('message');
  messageTop.innerHTML = message;
  if(message != 'Find a match') {
    messageTimer = setInterval(messageText, 1000, 'Find a match');
  }
}

//adds time to clock as game boes by
function addTime () {
  gameScore--;
  seconds++;
  if(seconds >= 60) {
    seconds = 0;
    minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
  }
  myTime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds: "0" + seconds);
  modalTimer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds: "0" + seconds);
  timerClock();
}

//Clock
function timerClock() {
  t = setTimeout(addTime, 1000);
}

//stops the clock!
function stopClock() {
  clearTimeout(t);
}

//when game is won
function gameDone () {
  if(gameScore < 0) {
    gameScore = 0;   //so there is no negative value if score is zero
  }
  document.getElementById("gameControl").innerHTML = "Play Again";
  messageText("You won the World Cup! <br> Thanks for Playing! <br> Your Score = "+ gameScore);
  buttonmessage.innerHTML = "Click to Play Again";
  toggleModal()
  stopClock();
}

//another turn
function pickAgain() {
  cardsFlippedOver = 0;
  flipArray = [];
  lastCardPicked = -1;
  clearInterval(flipTimer);
  addMove();
  checkScore();
}

//hiding cards
function hideCard() {
  document.getElementById(flipArray[2]).src = "images/wc-logo.jpg";
  document.getElementById(flipArray[3]).src = "images/wc-logo.jpg";
  pickAgain();
}
//from Udemey's Memory Game course
function shuffleArray(d) {
  for (let c = d.length - 1; c > 0; c--) {
    let b = Math.floor(Math.random() * (c + 1));
    let a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};


//reset icon
document.querySelector(".restart").addEventListener("click", resetGame);
//reset button on model
document.querySelector("#gameControl").addEventListener("click", reload);

//reloads page
function reload (){
  location.reload();
}

//reset the game
function resetGame () {
  resetMoves();
  startGame();
  resetStars();
}



// // from mathewcranford.com guides for resetMoves & stars
function resetMoves () {
  moves = 0;
  document.querySelector(".moves").innerHTML = moves;
}

function resetStars () {
  stars = 0;
  let starList = document.querySelectorAll(".stars li");
  for (star of starList) {
    star.style.display = 'inline';
  }
}



// help from mathewcranford.com guides
// moves counter
function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

// star counter
function checkScore () {
   if (moves === 3 || moves === 7) {   //how starts are calculated
     hideStar();
   }
 }

// removing stars
function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}
