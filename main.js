/**
 * Lotto 6/45 Number Generator
 */

const lottoDisplay = document.getElementById('lotto-display');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const emailSection = document.getElementById('email-section');
const lottoForm = document.getElementById('lotto-form');
const hiddenNumbersInput = document.getElementById('hidden-lotto-numbers');
const formStatus = document.getElementById('form-status');

let currentNumbers = [];

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
  emailSection.classList.add('hidden');
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  currentNumbers = generateLottoNumbers();
  hiddenNumbersInput.value = currentNumbers.join(', ');

  currentNumbers.forEach((num, index) => {
    createBall(num, index * 100);
  });

  setTimeout(() => {
    generateBtn.disabled = false;
    emailSection.classList.remove('hidden');
  }, 600 + (currentNumbers.length * 100));
}

/**
 * Form Handling (Formspree AJAX)
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const submitBtn = event.target.querySelector('button[type="submit"]');
  
  submitBtn.disabled = true;
  formStatus.textContent = '보내는 중...';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(event.target.action, {
      method: lottoForm.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent = '성공적으로 전송되었습니다! ✨';
      formStatus.classList.add('status-success');
      lottoForm.reset();
    } else {
      const result = await response.json();
      formStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : "전송에 실패했습니다.";
      formStatus.classList.add('status-error');
    }
  } catch (error) {
    formStatus.textContent = "오류가 발생했습니다. 나중에 다시 시도해주세요.";
    formStatus.classList.add('status-error');
  } finally {
    submitBtn.disabled = false;
  }
}

// Event Listeners
generateBtn.addEventListener('click', handleGenerate);
themeToggle.addEventListener('click', toggleTheme);
lottoForm.addEventListener('submit', handleFormSubmit);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  console.log('Lotto Generator Initialized');
});
