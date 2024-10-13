// initializing all the variables
let gameseq = [];
let userseq = [];
let colors = ["green", "blue", "purple", "orange"];
let started = false;
let level = 0;
let alllevels = [];

// accessing all the html elements
let heading = document.querySelector(".level");
let allbutton = document.querySelectorAll(".box");

// function to start the game
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started!");
    started = true;

    levelUp();
  }
});

// function for flashing of colors when the game flashes
function gameflashbtn(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}
// function for flashing of colors when the user presses it
function userflashbtn(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

// function that generates random color that will be flashed and updates the level
function levelUp() {
  userseq = [];
  level++;
  heading.innerText = "Level " + level;

  let randidx = Math.floor(Math.random() * 3);
  let randclr = colors[randidx];
  let randbox = document.querySelector(`.${randclr}`);
  gameseq.push(randclr);
  console.log(gameseq);
  gameflashbtn(randbox);
}

// function to check the sequence
function checkseq(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    alllevels.push(level);
    let highest_score = Math.max(...alllevels);
    heading.innerHTML = `<h3>Game Over!</h3> <br><p>Your score was: <b>${level}</b> <br>Highest Score: <b>${highest_score}</b> <br>Press any key to start again</p>`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    reset();
  }
}

// function to the event of pressing of button
function btnpressed() {
  console.log("Button pressed!");
  userflashbtn(this);

  userclr = this.classList[1];
  userseq.push(userclr);
  console.log(userseq);
  checkseq(userseq.length - 1);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

for (button of allbutton) {
  button.addEventListener("click", btnpressed);
}
