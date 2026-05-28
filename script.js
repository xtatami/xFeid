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
  const audio = document.getElementById("audioPlayer");
  const trackInfo = document.getElementById("trackInfo");
  const playBtn = document.querySelector(".play-btn");

  // Configura el primer track directamente
  audio.src = "assets/0.mp3";
  trackInfo.textContent = "/// Bajo De La Piel";
  audio.volume = 0.4;

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

  // ➡ Acción del botón "continue": mostrar main-content y arrancar música
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    errorSection.style.display = "none";
    mainContent.style.display = "block";
    // 🎵 reproducir automáticamente el primer track
    audio.play().then(() => {
      playBtn.innerHTML = "❚❚ PAUSE";
      playBtn.style.color = "#fff";
    }).catch(err => console.log("No se pudo reproducir la música:", err));
  });

  // Exponer función al botón
  window.toggleMusic = toggleMusic;
});
