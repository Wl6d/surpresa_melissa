const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createHeart() {
  let x = Math.random() * canvas.width;
  if (x > canvas.width / 3 && x < canvas.width * 2 / 3) return;
  const size = Math.random() * 10 + 10;
  const speed = Math.random() * 1 + 0.5;
  hearts.push({ x, y: canvas.height + size, size, speed });
}

function drawHeart(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "#ffb3ff";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -size / 2, -size / 2, -size / 2, -size / 2, 0);
  ctx.bezierCurveTo(-size / 2, size / 2, 0, size, 0, size);
  ctx.bezierCurveTo(0, size, size / 2, size / 2, size / 2, 0);
  ctx.bezierCurveTo(size / 2, -size / 2, 0, -size / 2, 0, 0);
  ctx.fill();
  ctx.restore();
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    h.y -= h.speed;
    drawHeart(h.x, h.y, h.size);
  }
  hearts = hearts.filter(h => h.y + h.size > 0);
  if (Math.random() < 0.05) createHeart();
  requestAnimationFrame(updateHearts);
}
updateHearts();

// CRONÔMETRO DESDE 04/02/2025
function atualizaContador() {
  const inicio = new Date("2025-02-04T00:00:00");
  const agora = new Date();
  const diff = agora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("contador").innerText = 
    dias + " dias, " + horas + "h " + minutos + "m " + segundos + "s";
}
setInterval(atualizaContador, 1000);
atualizaContador();
