const videos = Array.from(document.querySelectorAll("video"));
const interactiveElements = Array.from(document.querySelectorAll("a, button, video"));

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
});

interactiveElements.forEach((element) => {
  element.addEventListener("pointerenter", () => document.body.classList.add("is-linking"));
  element.addEventListener("pointerleave", () => document.body.classList.remove("is-linking"));
});

videos.forEach((video) => {
  video.addEventListener("play", () => {
    videos.forEach((other) => {
      if (other !== video) {
        other.pause();
      }
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.target instanceof HTMLVideoElement) {
        entry.target.pause();
      }
    });
  },
  { threshold: 0.18 }
);

videos.forEach((video) => observer.observe(video));
