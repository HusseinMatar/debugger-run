const player = document.getElementById("player");
const obstacles = document.querySelectorAll(".obstacle");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const timerDisplay = document.getElementById("timer");
const levelDisplay = document.getElementById("level");

let time = 0;
let gameOver = false;
let speed = 5;
const minSpacing = 600;

// Initialize obstacle positions
let positions = [];
let base = window.innerWidth + 200;
obstacles.forEach(() => {
  positions.push(base);
  base += minSpacing + Math.random() * 400;
});

// Jump logic
function jump() {
  if (!player.classList.contains("jump")) {
    player.classList.add("jump");
    setTimeout(() => player.classList.remove("jump"), 500);
  }
}
document.addEventListener("keydown", e => e.code === "Space" && jump());
document.addEventListener("touchstart", jump);

// Timer and level updates
const timer = setInterval(() => {
  if (gameOver) return;

  time++;
  timerDisplay.textContent = `Uptime: ${time}s`;
  levelDisplay.textContent = `Level: ${getLevelText(time)}`;

  if (time % 5 === 0) speed += 0.5;
}, 1000);

// Funny level names logic
function getLevelText(seconds) {
  if (seconds < 20) return "🐣 Intern-level Debugger";
  if (seconds < 40) return "💻 Junior Dev Who Can Console.log()";
  if (seconds < 60) return "🔧 Mid-level Engineer: Kinda Gets It";
  if (seconds < 80) return "⚡ Senior Dev: Fixes Bugs With Coffee";
  if (seconds < 100) return "🧠 Tech Lead of the Matrix";
  return "🧙‍♂️ God Mode: The Bug Whisperer";
}

// Obstacle movement and collision
function moveObstacles() {
  if (gameOver) return;

  obstacles.forEach((obstacle, index) => {
    positions[index] -= speed;
    obstacle.style.left = positions[index] + "px";

    if (positions[index] < -50) {
      const maxPos = Math.max(...positions);
      positions[index] = maxPos + minSpacing + Math.random() * 300;
    }

    const playerRect = player.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    const collided =
      playerRect.left < obsRect.right - 15 &&
      playerRect.right > obsRect.left + 15 &&
      playerRect.bottom > obsRect.top + 15 &&
      playerRect.top < obsRect.bottom - 15;

    if (collided) {
      gameOver = true;
      message.textContent = "❌ SyntaxError: Unexpected Failure";
      restartBtn.style.display = "inline-block";
      clearInterval(timer);
    }
  });

  requestAnimationFrame(moveObstacles);
}

// Start the game
requestAnimationFrame(moveObstacles);

// Restart
restartBtn.addEventListener("click", () => location.reload());
