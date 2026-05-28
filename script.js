document.addEventListener("DOMContentLoaded", () => {
  const introVideo = document.getElementById("introVideo");
  const startBtn = document.getElementById("startBtn");
  const introSection = document.querySelector(".intro");
  const errorSection = document.querySelector(".error-body");
  const continueBtn = document.querySelector(".error-body .bottom a");
  const mainContent = document.querySelector(".main-content");

  // ▶ Reproducir intro al hacer clic
  startBtn.addEventListener("click", () => {
    introVideo.play().then(() => {
      startBtn.style.display = "none";
    }).catch(err => console.log("No se pudo reproducir:", err));
  });

  // ⏹ Al terminar el video, mostrar pantalla de error
  introVideo.addEventListener("ended", () => {
    introSection.style.display = "none";
    errorSection.style.display = "flex";
  });

  // --- 🎵 Reproductor de música ---
  const tracks = [
    { src: "assets/0.mp3", name: "Bajo De La Piel" },
    { src: "assets/1.mp3", name: "AIZO1" },
    { src: "assets/2.mp3", name: "PARAGON" },
    { src: "assets/3.mp3", name: "Cuando El Agua Hirviendo" }
  ];

  let currentTrack = 0;
  const audio = document.getElementById("audioPlayer");
  const trackInfo = document.getElementById("trackInfo");
  const playBtn = document.querySelector(".play-btn");

  function loadTrack(index) {
    currentTrack = index;
    audio.src = tracks[currentTrack].src;
    trackInfo.textContent = "/// " + tracks[currentTrack].name;
    audio.play();
    playBtn.innerHTML = "❚❚ PAUSE";
    playBtn.style.color = "#fff";
  }

  function toggleMusic(btn) {
    if (audio.paused) {
      audio.play();
      btn.innerHTML = "❚❚ PAUSE";
      btn.style.color = "#fff";
    } else {
      audio.pause();
      btn.innerHTML = "► PLAY";
      btn.style.color = "var(--theme-red)";
    }
  }

  function nextTrack() {
    loadTrack((currentTrack + 1) % tracks.length);
  }

  function prevTrack() {
    loadTrack((currentTrack - 1 + tracks.length) % tracks.length);
  }

  audio.volume = 0.4;
  audio.addEventListener("ended", nextTrack);

  // ➡ Acción del botón "continue" con transición y música
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    errorSection.classList.add("fade-out"); // activa animación CSS
    setTimeout(() => {
      errorSection.style.display = "none";
      mainContent.style.display = "block";
      // 🎵 iniciar música automáticamente
      loadTrack(0);
    }, 1000); // coincide con la duración de tu transición CSS
  });

  // Exponer funciones a botones
  window.toggleMusic = toggleMusic;
  window.nextTrack = nextTrack;
  window.prevTrack = prevTrack;
});
