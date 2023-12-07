// variables to track the game
let roundCount = 0;
let playerTotalScore = 0;
let computerTotalScore = 0;

// function to roll die
function rollDicePair() {
  // Generate random numbers between 1 and 6 for each dice
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  return [dice1, dice2]; // Return an array with the rolled values
}

// function to calculate score based on dice values
function calculateScore(dice1, dice2) {
  let score = 0;

  // Calculate score based on dice values
  if (dice1 === 1 || dice2 === 1) {
    score = 0; // If any dice is a 1, score for the round is 0
  } else if (dice1 === dice2) {
    score = (dice1 + dice2) * 2; // If both dice are the same, score is double the sum
  } else {
    score = dice1 + dice2; // else score is the sum of the two die
  }

  return score; // Return the calculated score
}

// function to update the UI with dice values and scores
function updateUI(playerDice1, playerDice2, computerDice1, computerDice2, playerScore, computerScore, playerTotalScore, computerTotalScore) {
  // Update displayed dice values for player and computer
  document.querySelector('.player .dice').textContent = `Dice: ${playerDice1}, ${playerDice2}`;
  document.querySelector('.computer .dice').textContent = `Dice: ${computerDice1}, ${computerDice2}`;

  // Updates displayed scores for player and computer
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;

  // Updates displayed total scores for player and computer
  document.getElementById('playerTotalScore').textContent = playerTotalScore;
  document.getElementById('computerTotalScore').textContent = computerTotalScore;
}

const dicePaths = [
  '../images/black-dice-1.jpg',
  '../images/black-dice-2.jpg',
  '../images/black-dice-3.jpg',
  '../images/black-dice-4.jpg',
  '../images/black-dice-5.jpg',
  '../images/black-dice-6.jpg',
  '../images/white-dice-1.jpg',
  '../images/white-dice-2.jpg',
  '../images/white-dice-3.jpg',
  '../images/white-dice-4.jpg',
  '../images/white-dice-5.jpg',
  '../images/white-dice-6.jpg',
];

let animationStarted = false;
let lastFrameTime = 0;
let animationFrameId = null;
const frameDuration = 100;

function updateDiceImagesWithAnimation(dice1, dice2, player) {
  const diceImages = [
    document.getElementById(`${player}DiceImage1`),
    document.getElementById(`${player}DiceImage2`),
  ];

  let currentFrame = 0;
  const totalFrames = 36; // Adjust this number to control the duration of the animation

  const rollDiceInterval = setInterval(() => {
    diceImages[0].src = dicePaths[Math.floor(Math.random() * 6)];
    diceImages[1].src = dicePaths[Math.floor(Math.random() * 6) + 6];

    currentFrame++;

    if (currentFrame === totalFrames) {
      clearInterval(rollDiceInterval);
      diceImages[0].src = `../images/white-dice-${dice1}.jpg`;
      diceImages[1].src = `../images/black-dice-${dice2}.jpg`;
    }
  }, frameDuration);
}

// Function to display the winner message
function displayWinnerMessage(winner) {
  const winnerMessage = document.getElementById('winnerMessage');
  winnerMessage.textContent = `Game Over! ${winner}`; // Display the winner message
  winnerMessage.style.display = 'block'; // Show the winner message element
}

// Event listener for rolling dice button
document.getElementById('rollDice').addEventListener('click', function() {
  // Roll dice for player and computer
  const playerDice = rollDicePair();
  const computerDice = rollDicePair();

  // Calculate scores for player and computer
  const playerScore = calculateScore(playerDice[0], playerDice[1]);
  const computerScore = calculateScore(computerDice[0], computerDice[1]);

  // Update total scores 
  playerTotalScore += playerScore;
  computerTotalScore += computerScore;
  updateUI(playerDice[0], playerDice[1], computerDice[0], computerDice[1], playerScore, computerScore, playerTotalScore, computerTotalScore);

  // Call the animation function to update dice images with animation
  updateDiceImagesWithAnimation(playerDice[0], playerDice[1], 'player');
  updateDiceImagesWithAnimation(computerDice[0], computerDice[1], 'computer');

  roundCount++; // Increments the round count

  // Check if it's the end of the game (3 rounds)
  if (roundCount === 3) {
    let winner = '';
    // Determine the winner or if it's a tie
    if (playerTotalScore > computerTotalScore) {
      winner = 'Player wins!';
    } else if (playerTotalScore < computerTotalScore) {
      winner = 'Computer wins!';
    } else {
      winner = 'It\'s a tie!';
    }

    // Display the winner message and reset the game after 2 seconds
    displayWinnerMessage(winner);
    setTimeout(() => {
      roundCount = 0;
      playerTotalScore = 0;
      computerTotalScore = 0;
      updateUI(0, 0, 0, 0, 0, 0, 0, 0);
      document.getElementById('winnerMessage').style.display = 'none';
    }, 2000);
  }
});

// Event listener for resetting the game
document.getElementById('resetGame').addEventListener('click', function() {
  // Reset game variables and update game
  roundCount = 0;
  playerTotalScore = 0;
  computerTotalScore = 0;
  updateUI(0, 0, 0, 0, 0, 0, 0, 0);
  document.getElementById('winnerMessage').style.display = 'none';
});
