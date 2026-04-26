const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = window.localStorage.getItem("theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const initialTheme = storedTheme || (preferredDark ? "dark" : "light");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle?.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light color theme" : "Switch to dark color theme",
  );
}

applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  window.localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

const canvas = document.querySelector("#interface-canvas");
const context = canvas?.getContext("2d");
let animationFrame = 0;

function fitCanvas() {
  if (!canvas || !context) return;
  const { width, height } = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawInterface(time = 0) {
  if (!canvas || !context) return;

  const { width, height } = canvas.getBoundingClientRect();
  context.clearRect(0, 0, width, height);

  const isDark = root.dataset.theme === "dark";
  const gridColor = isDark ? "rgba(244, 240, 232, 0.08)" : "rgba(21, 21, 21, 0.08)";
  const accent = isDark ? "rgba(91, 192, 181, 0.62)" : "rgba(15, 111, 104, 0.48)";
  const rust = isDark ? "rgba(212, 134, 97, 0.56)" : "rgba(182, 90, 53, 0.36)";
  const gold = isDark ? "rgba(228, 189, 98, 0.5)" : "rgba(215, 168, 66, 0.34)";
  const offset = prefersReducedMotion ? 0 : (time / 80) % 28;

  context.lineWidth = 1;
  context.strokeStyle = gridColor;
  for (let x = -28 + offset; x < width + 28; x += 28) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = -28 + offset; y < height + 28; y += 28) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  const lanes = [
    { y: height * 0.25, color: accent, width: width * 0.56 },
    { y: height * 0.5, color: rust, width: width * 0.42 },
    { y: height * 0.73, color: gold, width: width * 0.5 }
  ];

  lanes.forEach((lane, index) => {
    const travel = prefersReducedMotion ? 0 : Math.sin(time / 1100 + index) * width * 0.035;
    const startX = width * 0.18 + travel;
    const endX = startX + lane.width;

    context.strokeStyle = lane.color;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(startX, lane.y);
    context.lineTo(endX, lane.y);
    context.stroke();

    context.fillStyle = lane.color;
    for (let i = 0; i < 4; i += 1) {
      const x = startX + (lane.width / 3) * i;
      context.fillRect(x - 3, lane.y - 3, 6, 6);
    }
  });

  if (!prefersReducedMotion) {
    animationFrame = window.requestAnimationFrame(drawInterface);
  }
}

if (canvas && context) {
  fitCanvas();
  drawInterface();
  window.addEventListener("resize", fitCanvas);
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
}
