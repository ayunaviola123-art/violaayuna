// Elements
const fileInput = document.getElementById('fileInput');
const urlInput = document.getElementById('urlInput');
const useUrlBtn = document.getElementById('useUrlBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customMessage = document.getElementById('customMessage');

const preview = document.getElementById('preview');
const photoBox = document.getElementById('photoBox');
const photo = document.getElementById('photo');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');

const music = document.getElementById('bgMusic');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// State
let currentImageSrc = null;

// --- Image handling: file upload preview ---
fileInput.addEventListener('change', e => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { alert('Pilih file gambar.'); return; }

  const reader = new FileReader();
  reader.onload = ev => {
    currentImageSrc = ev.target.result;
    showPreviewImage(currentImageSrc);
  };
  reader.readAsDataURL(file);
});

// --- Use URL button ---
useUrlBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (!url) { alert('Masukkan URL gambar terlebih dahulu.'); return; }
  try {
    new URL(url);
    currentImageSrc = url;
    showPreviewImage(currentImageSrc);
  } catch {
    alert('URL tidak valid.');
  }
});

function showPreviewImage(src){
  photo.src = src;
  photo.alt = 'Foto ucapan';
  photoBox.classList.remove('hidden');
  preview.classList.remove('hidden');
  messageBox.classList.remove('hidden');
  // show preview message as well
  messageText.textContent = customMessage.value.trim();
}

// --- Start showing final ucapan ---
startBtn.addEventListener('click', () => {
  const text = customMessage.value.trim();
  if (!text) {
    alert('Ketik ucapanmu terlebih dahulu.');
    return;
  }

  // show preview if not yet visible
  preview.classList.remove('hidden');
  messageBox.classList.remove('hidden');
  messageText.textContent = text;

  // if no image chosen, show a default gentle image
  if (!currentImageSrc) {
    currentImageSrc = 'https://i.ibb.co/5rv6s0P/love-cake.jpg'; // default
    photo.src = currentImageSrc;
    photoBox.classList.remove('hidden');
  }

  // play music (user gesture)
  try { music.play().catch(()=>{}); } catch(e){}

  // start confetti
  startConfetti();

  // scroll to preview (helpful on small screens)
  setTimeout(() => {
    photoBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
});

// --- Reset to starting state ---
resetBtn.addEventListener('click', () => {
  currentImageSrc = null;
  photo.src = '';
  photoBox.classList.add('hidden');
  preview.classList.add('hidden');
  messageBox.classList.add('hidden');
  messageText.textContent = '';
  urlInput.value = '';
  fileInput.value = '';
  // stop music
  music.pause(); music.currentTime = 0;
  // stop confetti
  stopConfetti();
});

// --- CONFETTI simple implementation ---
let confettiParticles = [];
let confettiRAF = null;

function initConfetti(){
  confettiParticles = [];
  const count = Math.floor((window.innerWidth / 10) * 1.4); // responsive count
  for (let i=0;i<count;i++){
    confettiParticles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*-canvas.height,
      r: (Math.random()*6)+3,
      d: (Math.random()*3)+1,
      tilt: Math.random()*20,
      color: `hsl(${Math.random()*360},70%,60%)`,
      swing: Math.random()*0.02+0.01
    });
  }
}

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiParticles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.tilt * Math.PI / 180);
    ctx.fillRect(-p.r/2, -p.r/1.5, p.r, p.r*1.6);
    ctx.restore();
  });
}

function updateConfetti(){
  confettiParticles.forEach(p=>{
    p.y += p.d + Math.sin(p.x * p.swing) * 0.5;
    p.x += Math.cos(p.y * p.swing) * 0.5;
    p.tilt += 0.5;
    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = Math.random()*canvas.width;
    }
  });
}

function animate(){
  drawConfetti();
  updateConfetti();
  confettiRAF = requestAnimationFrame(animate);
}

function startConfetti(){
  cancelAnimationFrame(confettiRAF);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initConfetti();
  animate();
}

function stopConfetti(){
  cancelAnimationFrame(confettiRAF);
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

// handle resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// initial hide
preview.classList.add('hidden');
photoBox.classList.add('hidden');
messageBox.classList.add('hidden');
