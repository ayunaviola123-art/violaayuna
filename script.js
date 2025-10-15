const btn = document.getElementById("startBtn");
const msg = document.getElementById("message");
const photoBox = document.getElementById("photo-container");
const music = document.getElementById("bgMusic");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

btn.addEventListener("click", () => {
  btn.style.display = "none";
  photoBox.classList.remove("hidden"); // tampilkan foto
  showMessage();
  startConfetti();
  music.play();
});

function showMessage() {
  const lines = [
    "Hai sayangku 💞",
    "Hari ini adalah hari spesialmu 🥳",
    "Terima kasih sudah hadir di hidupku...",
    "Kamu adalah alasan senyumku setiap hari 💐",
    "Semoga semua impianmu terwujud dan kamu selalu bahagia ✨",
    "Selamat ulang tahun, cintaku ❤️"
  ];

  msg.classList.remove("hidden");

  let i = 0;
  const interval = setInterval(() => {
    if (i < lines.length) {
      msg.innerHTML += `<p>${lines[i]}</p>`;
      i++;
    } else {
      clearInterval(interval);
    }
  }, 2000);
}

// 🎊 Confetti animation
const confettiCount = 200;
let confetti = [];

function randomColor() {
  const colors = ["#ff6fae","#ff9ecd","#b388eb","#ffc0cb","#f6b1d0"];
  return colors[Math.floor(Math.random() * colors.length)];
}

for (let i = 0; i < confettiCount; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    c: randomColor(),
    d: Math.random() * 3 + 2
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, false);
    ctx.fillStyle = f.c;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(f => {
    f.y += f.d;
    if (f.y > canvas.height) {
      f.y = -10;
      f.x = Math.random() * canvas.width;
      f.c = randomColor();
    }
  });
}

function startConfetti() {
  setInterval(drawConfetti, 20);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
