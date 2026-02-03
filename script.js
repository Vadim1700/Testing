const getSignalBtn = document.getElementById('get-signal');
const backBtn = document.getElementById('back');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const signalValue = document.getElementById('signal-value');
const signalTime = document.getElementById('signal-time');
const signalList = document.getElementById('signal-list');
const addSignalBtn = document.getElementById('add-signal');
const removeSignalBtn = document.getElementById('remove-signal');

let cooldown = false;
let signals = [];

function renderSignal(multiplier, minutes) {
  signalValue.innerHTML = '';
  signalTime.innerHTML = '';

  [...multiplier].forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('signal-digit');
    animateDigit(span);
    signalValue.appendChild(span);
  });

  [...minutes].forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('signal-digit');
    animateDigit(span);
    signalTime.appendChild(span);
  });
}

function animateDigit(span) {
  const scale = Math.random() > 0.5 ? 1.3 : 0.7;
  span.style.transform = `scale(${scale})`;
  setTimeout(() => {
    span.style.transform = 'scale(1)';
  }, 500);
}

getSignalBtn.addEventListener('click', () => {
  if (cooldown || signals.length === 0) return;

  const signal = signals.shift(); // удаляем сигнал после получения
  renderSignal(signal.multiplier, signal.minutes);

  updateSignalList();

  cooldown = true;
  getSignalBtn.disabled = true;
  setTimeout(() => {
    cooldown = false;
    getSignalBtn.disabled = false;
  }, 15000);
});

backBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

addSignalBtn.addEventListener('click', () => {
  const multiplier = 'x' + Math.floor(Math.random() * 200 + 1);
  const minutes = Math.floor(Math.random() * 200) + 'm';
  signals.push({ multiplier, minutes });
  updateSignalList();
});

removeSignalBtn.addEventListener('click', () => {
  signals.pop();
  updateSignalList();
});

function updateSignalList() {
  signalList.innerHTML = signals.map(s => `<div>${s.multiplier} ${s.minutes}</div>`).join('');
}
