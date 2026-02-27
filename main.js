/**
 * Lotto 6/45 Number Generator
 */

const lottoDisplay = document.getElementById('lotto-display');
const generateBtn = document.getElementById('generate-btn');

/**
 * Generates 6 unique random numbers between 1 and 45
 * @returns {number[]} Sorted array of 6 unique numbers
 */
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const rand = Math.floor(Math.random() * 45) + 1;
    numbers.add(rand);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

/**
 * Returns the CSS class based on the number range
 * @param {number} num 
 * @returns {string}
 */
function getRangeClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-2';
  if (num <= 30) return 'range-3';
  if (num <= 40) return 'range-4';
  return 'range-5';
}

/**
 * Creates and appends a lotto ball element
 * @param {number} num 
 * @param {number} delay Delay in ms for the animation
 */
function createBall(num, delay) {
  const ball = document.createElement('div');
  ball.className = `ball ${getRangeClass(num)}`;
  ball.textContent = num;
  ball.style.animationDelay = `${delay}ms`;
  lottoDisplay.appendChild(ball);
}

/**
 * Handles the generation process with UI feedback
 */
async function handleGenerate() {
  // Disable button and clear current numbers
  generateBtn.disabled = true;
  lottoDisplay.innerHTML = '';

  const numbers = generateLottoNumbers();

  // Create balls with a staggered delay
  numbers.forEach((num, index) => {
    createBall(num, index * 100);
  });

  // Re-enable button after animation finishes
  setTimeout(() => {
    generateBtn.disabled = false;
  }, 600 + (numbers.length * 100));
}

// Event Listeners
generateBtn.addEventListener('click', handleGenerate);

// Initialize with a subtle entrance for the button
window.addEventListener('DOMContentLoaded', () => {
  console.log('Lotto Generator Initialized');
});
