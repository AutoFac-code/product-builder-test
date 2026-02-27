/**
 * Lotto 6/45 Number Generator
 */

const lottoDisplay = document.getElementById('lotto-display');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

/**
 * Theme Management
 */
function initTheme() {
  const savedTheme = localStorage.getItem('lotto-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('lotto-theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('.icon');
  icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

/**
 * Lotto Logic
 */
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const rand = Math.floor(Math.random() * 45) + 1;
    numbers.add(rand);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function getRangeClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-2';
  if (num <= 30) return 'range-3';
  if (num <= 40) return 'range-4';
  return 'range-5';
}

function createBall(num, delay) {
  const ball = document.createElement('div');
  ball.className = `ball ${getRangeClass(num)}`;
  ball.textContent = num;
  ball.style.animationDelay = `${delay}ms`;
  lottoDisplay.appendChild(ball);
}

async function handleGenerate() {
  generateBtn.disabled = true;
  lottoDisplay.innerHTML = '';

  const numbers = generateLottoNumbers();

  numbers.forEach((num, index) => {
    createBall(num, index * 100);
  });

  setTimeout(() => {
    generateBtn.disabled = false;
  }, 600 + (numbers.length * 100));
}

// Event Listeners
generateBtn.addEventListener('click', handleGenerate);
themeToggle.addEventListener('click', toggleTheme);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  console.log('Lotto Generator Initialized');
});
