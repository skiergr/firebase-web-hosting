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

    // change background color to a random color after .5 sceonds
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

// Create an instance of the Main class
document.mainClass = new Main();
