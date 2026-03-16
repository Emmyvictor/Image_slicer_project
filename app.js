var slides = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=60",
    tag: "Nature",
    title: "Where Mountains <em>Touch</em> the Sky",
    desc: "A breathtaking panorama of the Swiss Alps at golden hour — nature's most dramatic performance.",
  },
  {
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=120&q=60",
    tag: "Architecture",
    title: "Cities That <em>Never</em> Sleep",
    desc: "Glass towers and glowing streets — the restless pulse of the modern metropolis after dark.",
  },
  {
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=120&q=60",
    tag: "Ocean",
    title: "The Sea Always <em>Calls</em> You Back",
    desc: "Turquoise waters stretching to the horizon — a stillness that only the open ocean can give.",
  },
  {
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=120&q=60",
    tag: "Forest",
    title: "Ancient Trees, <em>Timeless</em> Light",
    desc: "A cathedral of towering pines filtering morning mist — wild and impossibly serene.",
  },
  {
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=120&q=60",
    tag: "Desert",
    title: "Sand, Silence & <em>Infinite</em> Sky",
    desc: "The Sahara at dusk — rolling dunes cast long shadows across a landscape shaped by time.",
  },
  {
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=120&q=60",
    tag: "Arctic",
    title: "Northern Lights & <em>Frozen</em> Dreams",
    desc: "Ribbons of aurora borealis ripple across an arctic sky — nature's greatest light show.",
  },
];

var current = 0;
var total = slides.length;
var autoTimer = null;
var progTimer = null;
var isPaused = false;
var INTERVAL = 5000;

var slidesWrap = document.getElementById("slidesWrap");
var dotsWrap = document.getElementById("dotsWrap");
var thumbsWrap = document.getElementById("thumbsWrap");
var progBar = document.getElementById("progressBar");
var pauseBadge = document.getElementById("pauseBadge");
var sideLabel = document.getElementById("sideLabel");

// Build slides, dots, thumbs
for (var i = 0; i < total; i++) {
  (function (idx) {
    var s = slides[idx];

    // Slide
    var div = document.createElement("div");
    div.className = "slide" + (idx === 0 ? " active" : "");
    div.id = "slide-" + idx;
    div.innerHTML =
      '<img class="slide-img" src="' +
      s.img +
      '" alt="' +
      s.tag +
      '" loading="' +
      (idx === 0 ? "eager" : "lazy") +
      '">' +
      '<div class="slide-overlay"></div>' +
      '<div class="slide-content">' +
      '<div class="slide-text">' +
      '<div class="slide-tag">' +
      s.tag +
      "</div>" +
      '<h2 class="slide-title">' +
      s.title +
      "</h2>" +
      '<p class="slide-desc">' +
      s.desc +
      "</p>" +
      "</div>" +
      '<div class="slide-count">' +
      '<div class="count-big">0' +
      (idx + 1) +
      "</div>" +
      '<div class="count-small">/ 0' +
      total +
      "</div>" +
      "</div>" +
      "</div>";
    slidesWrap.appendChild(div);

    // Dot
    var dot = document.createElement("div");
    dot.className = "dot" + (idx === 0 ? " active" : "");
    dot.addEventListener("click", function () {
      goTo(idx);
    });
    dotsWrap.appendChild(dot);

    // Thumb
    var thumb = document.createElement("div");
    thumb.className = "thumb" + (idx === 0 ? " active" : "");
    thumb.innerHTML =
      '<img src="' + s.thumb + '" alt="' + s.tag + '" loading="lazy">';
    thumb.addEventListener("click", function () {
      goTo(idx);
    });
    thumbsWrap.appendChild(thumb);
  })(i);
}

// Progress bar
var progStart = null;
var progRAF = null;

function startProgress() {
  cancelAnimationFrame(progRAF);
  progStart = null;
  progBar.style.transition = "none";
  progBar.style.width = "0%";

  function step(ts) {
    if (!progStart) progStart = ts;
    var pct = Math.min(((ts - progStart) / INTERVAL) * 100, 100);
    progBar.style.width = pct + "%";
    if (pct < 100) progRAF = requestAnimationFrame(step);
  }
  progRAF = requestAnimationFrame(step);
}

function pauseProgress() {
  cancelAnimationFrame(progRAF);
}

function goTo(index) {
  var allSlides = document.querySelectorAll(".slide");
  var allDots = document.querySelectorAll(".dot");
  var allThumbs = document.querySelectorAll(".thumb");

  allSlides[current].classList.remove("active");
  allDots[current].classList.remove("active");
  allThumbs[current].classList.remove("active");

  current = ((index % total) + total) % total;

  allSlides[current].classList.add("active");
  allDots[current].classList.add("active");
  allThumbs[current].classList.add("active");

  sideLabel.textContent = slides[current].tag + " — Auto-Advancing";

  if (!isPaused) startProgress();
}

function next() {
  goTo(current + 1);
}
function prev() {
  goTo(current - 1);
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(next, INTERVAL);
  startProgress();
}

function stopAuto() {
  clearInterval(autoTimer);
  pauseProgress();
}

// Start
startAuto();

// Buttons
document.getElementById("nextBtn").addEventListener("click", function () {
  next();
  if (!isPaused) startAuto();
});
document.getElementById("prevBtn").addEventListener("click", function () {
  prev();
  if (!isPaused) startAuto();
});

// Hover pause
var sliderEl = document.getElementById("slider");
sliderEl.addEventListener("mouseenter", function () {
  isPaused = true;
  stopAuto();
  pauseBadge.classList.add("show");
});
sliderEl.addEventListener("mouseleave", function () {
  isPaused = false;
  startAuto();
  pauseBadge.classList.remove("show");
});

// Keyboard
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    next();
    if (!isPaused) startAuto();
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    prev();
    if (!isPaused) startAuto();
  }
  if (e.key === " ") {
    e.preventDefault();
    if (isPaused) {
      isPaused = false;
      startAuto();
      pauseBadge.classList.remove("show");
    } else {
      isPaused = true;
      stopAuto();
      pauseBadge.classList.add("show");
    }
  }
});

// Touch swipe
var touchX = 0;
sliderEl.addEventListener(
  "touchstart",
  function (e) {
    touchX = e.touches[0].clientX;
  },
  { passive: true },
);
sliderEl.addEventListener("touchend", function (e) {
  var dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) {
    if (dx < 0) next();
    else prev();
    if (!isPaused) startAuto();
  }
});
