const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

const questionCard = document.getElementById('questionCard');
const dateCard = document.getElementById('dateCard');
const venueCard = document.getElementById('venueCard');
const foodCard = document.getElementById('foodCard');
const finalCard = document.getElementById('finalCard');

const dateForm = document.getElementById('dateForm');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const nameInput = document.getElementById('nameInput');
const noteInput = document.getElementById('noteInput');

const venueNextBtn = document.getElementById('venueNextBtn');
const venueBackBtn = document.getElementById('venueBackBtn');
const foodBackBtn = document.getElementById('foodBackBtn');
const finalBackBtn = document.getElementById('finalBackBtn');
const finalMessage = document.getElementById('finalMessage');
const whatsappBtn = document.getElementById('whatsappBtn');

// Your WhatsApp number in international format
const WHATSAPP_NUMBER = '2348061177212';

let selectedDate = '';
let selectedTime = '';
let selectedFood = '';
let selectedName = '';
let selectedNote = '';


// ========================================
// ORIGINAL BEHAVIOUR: NO BUTTON RUNS AWAY
// ========================================

function moveNo() {
  noBtn.style.position = 'fixed';
  noBtn.style.zIndex = '100';
  
  const margin = 12;
  
  const maxX = Math.max(
    margin,
    window.innerWidth - noBtn.offsetWidth - margin
  );
  
  const maxY = Math.max(
    margin,
    window.innerHeight - noBtn.offsetHeight - margin
  );
  
  const x = margin + Math.random() * Math.max(0, maxX - margin);
  const y = margin + Math.random() * Math.max(0, maxY - margin);
  
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// When someone moves the mouse towards NO
noBtn.addEventListener('mouseover', moveNo);

// When someone touches NO on a phone
noBtn.addEventListener('touchstart', (event) => {
  event.preventDefault();
  moveNo();
}, { passive: false });

// If someone manages to click NO, it still runs away
noBtn.addEventListener('click', (event) => {
  event.preventDefault();
  moveNo();
});


// ========================================
// YES BUTTON: OPEN DATE FORM + FALLING HEARTS
// ========================================

yesBtn.addEventListener('click', () => {
  questionCard.classList.add('hidden');
  dateCard.classList.remove('hidden');
  
  createHearts();
});


// ========================================
// DATE FORM
// ========================================

dateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  selectedName = nameInput.value.trim();
  selectedDate = dateInput.value;
  selectedTime = timeInput.value;
  selectedNote = noteInput.value.trim();
  
  if (!selectedName || !selectedDate || !selectedTime) {
    alert('Please enter your name and choose a date and time.');
    return;
  }
  
  const chosenDate = new Date(`${selectedDate}T00:00:00`);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (chosenDate < today) {
    alert('Please choose today or a future date.');
    return;
  }
  
  dateCard.classList.add('hidden');
  venueCard.classList.remove('hidden');
});


// ========================================
// VENUE SCREEN
// ========================================

venueNextBtn.addEventListener('click', () => {
  venueCard.classList.add('hidden');
  foodCard.classList.remove('hidden');
});

venueBackBtn.addEventListener('click', () => {
  venueCard.classList.add('hidden');
  dateCard.classList.remove('hidden');
});


// ========================================
// FOOD SELECTION
// ========================================

foodBackBtn.addEventListener('click', () => {
  foodCard.classList.add('hidden');
  venueCard.classList.remove('hidden');
});

document.querySelectorAll('.food-btn').forEach((button) => {
  button.addEventListener('click', () => {
    selectedFood = button.dataset.food;
    
    document.querySelectorAll('.food-btn').forEach((item) => {
      item.classList.toggle('selected', item === button);
    });
    
    showFinalCard();
  });
});


// ========================================
// FINAL SCREEN
// ========================================

function showFinalCard() {
  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  finalMessage.textContent =
    `${selectedName}, your suggested date is ${formattedDate} at ${selectedTime}. ` +
    `Venue: The Garden Restaurant, Near Custom Area, Maiduguri. ` +
    `Food choice: ${selectedFood}.`;
  
  foodCard.classList.add('hidden');
  finalCard.classList.remove('hidden');
  
  createHearts();
}

finalBackBtn.addEventListener('click', () => {
  finalCard.classList.add('hidden');
  foodCard.classList.remove('hidden');
});


// ========================================
// WHATSAPP FEATURE
// ========================================

whatsappBtn.addEventListener('click', () => {
  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const message = [
    'Hi! Here are my choices for our date 💕',
    `Name: ${selectedName}`,
    `Preferred date: ${formattedDate}`,
    `Preferred time: ${selectedTime}`,
    'Suggested venue: The Garden Restaurant, Near Custom Area, Maiduguri',
    `Food choice: ${selectedFood}`,
    selectedNote ? `Message: ${selectedNote}` : ''
  ].filter(Boolean).join('\n');
  
  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});


// ========================================
// FALLING HEARTS ANIMATION
// ========================================

function createHearts() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      
      heart.classList.add('falling-heart');
      
      heart.textContent = ['💖', '💕', '💗', '💓'][
        Math.floor(Math.random() * 4)
      ];
      
      heart.style.left = `${Math.random() * 100}vw`;
      
      heart.style.animationDuration =
        `${Math.random() * 3 + 2}s`;
      
      heart.style.fontSize =
        `${Math.random() * 12 + 18}px`;
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
      
    }, i * 100);
  }
  }
