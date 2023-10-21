class Main {
  constructor() {
    this.pageViewsKey = 'pageViewsCount';
    this.currentPageKey = 'currentPage';

    // Initialize the current page if it's not set
    if (!localStorage.getItem(this.currentPageKey)) {
      localStorage.setItem(this.currentPageKey, 'about.html');
    }

    this.initializeCounter();
    this.displayCount();

    // Handle the button click
    document.getElementById('playMusicButton').addEventListener('click', () => {
      this.playMusicAndFlash();
    });
    //event listener responding to any click
    document.addEventListener('click', (event) => {
      //confirm element is not a button
      if (event.target.tagName === 'BUTTON') {
        return;
      }
      //change background color to a random color
      this.changeBackgroundColor(
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      );
    });

    const reactionTester = new ReactionTester();
  }

  initializeCounter() {
    if (!localStorage.getItem(this.pageViewsKey)) {
      localStorage.setItem(this.pageViewsKey, '0');
    }
  }

  incrementCount() {
    let currentCount = parseInt(localStorage.getItem(this.pageViewsKey));
    currentCount++;
    localStorage.setItem(this.pageViewsKey, currentCount.toString());
  }

  displayCount() {
    this.incrementCount();
    // Update count in div id count
    document.getElementById('count').innerHTML =
      'You have visited this page ' +
      localStorage.getItem(this.pageViewsKey) +
      ' times.';
  }

  playMusicAndFlash() {
    // Play music
    const audio = new Audio('Wii Music - Background Music.mp3');
    audio.play();

    // Flash the screen white
    document.body.style.backgroundColor = 'white';

    // change background color to a random color after .5 seconds
    setTimeout(() => {
      //change color to black
      this.changeBackgroundColor('black');
    }, 250);

    setTimeout(() => {
      this.changeBackgroundColor('white');
    }, 250);

    setTimeout(() => {
      this.changeBackgroundColor(
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      );
    }, 250);
  }

  //method that changes the page background color
  changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }
}

class ReactionTester {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
    this.isGameOn = false;

    this.initializeGame();
  }

  initializeGame() {
    const reactionSection = document.getElementById('reactionTester');

    reactionSection.addEventListener('click', () => {
      if (!this.isGameOn) {
        // Start the game
        this.startGame();
      } else {
        // End the game and measure reaction time
        this.endGame();
      }
    });
  }

  startGame() {
    this.isGameOn = true;
    //random timeout from 2.5 to 7.5 seconds
    const timeout = Math.random() * 5000 + 2500;
    setTimeout(() => {
      this.changeColor();
    }, timeout);
  }

  changeColor() {
    this.startTime = new Date().getTime();
    document.getElementById('reactionTester').style.backgroundColor = 'green';
  }

  endGame() {
    this.isGameOn = false;
    this.endTime = new Date().getTime();
    const reactionTime = this.endTime - this.startTime;
    this.displayReactionTime(reactionTime);
  }

  displayReactionTime(reactionTime) {
    const reactionSection = document.getElementById('reactionTester');
    reactionSection.style.backgroundColor = 'red';
    reactionSection.innerHTML = `Your reaction time: ${reactionTime}ms. Click to play again.`;
  }
}

const main = new Main();
