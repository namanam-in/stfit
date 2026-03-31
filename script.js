const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));

const nextUrlField = document.getElementById("nextUrlField");
if (nextUrlField) {
  nextUrlField.value = new URL("thankyou.html", window.location.href).toString();
}

const isLowEndDevice =
  Boolean(navigator.connection && navigator.connection.saveData) ||
  (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4) ||
  (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4) ||
  window.matchMedia("(max-width: 760px)").matches;

if (isLowEndDevice) {
  document.body.classList.add("low-end-device");
}

const heroVideo = document.querySelector(".hero-video");
const heroVideoWrap = document.querySelector(".hero-video-wrap");

if (heroVideo && heroVideoWrap) {
  const heroSource = heroVideo.querySelector("source[data-src]");

  const markHeroReady = () => {
    heroVideoWrap.classList.add("is-ready");
  };

  const loadHeroVideo = () => {
    if (!heroSource || heroSource.src) {
      return;
    }

    heroSource.src = heroSource.dataset.src;
    heroVideo.load();

    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  heroVideo.addEventListener("loadeddata", markHeroReady, { once: true });
  heroVideo.addEventListener("canplay", markHeroReady, { once: true });

  window.setTimeout(loadHeroVideo, isLowEndDevice ? 1200 : 180);
}
