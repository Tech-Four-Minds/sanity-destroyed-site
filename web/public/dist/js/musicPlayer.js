const musics = [
  {
    album: "Sanity Destroyed",
    number: 1,
    title: "Sanity Destroyed",
    file: "/dist/audio/sanity-destroyed.mp3",
    duration: "05:00",
    execute: true,
  },
  {
    album: "Sanity Destroyed",
    number: 2,
    title: "Fear of Death",
    file: "/dist/audio/fear-of-death.mp3",
    duration: "05:36",
    execute: false,
  },
  {
    album: "Sanity Destroyed",
    number: 3,
    title: "Heaven! Save Him!",
    file: "/dist/audio/heaven-save-him.mp3",
    duration: "05:52",
    execute: false,
  },
  {
    album: "Sanity Destroyed",
    number: 4,
    title: "The Blood In The Sky",
    file: "/dist/audio/blood-sky.mp3",
    duration: "06:07",
    execute: false,
  },
  {
    album: "Sanity Destroyed",
    number: 5,
    title: "Far Away",
    file: "/dist/audio/far-away.mp3",
    duration: "03:31",
    execute: false,
  },
  {
    album: "Sanity Destroyed",
    number: 6,
    title: "I Can't Be Myself",
    file: "/dist/audio/i-can-not-be-myself.mp3",
    duration: "07:30",
    execute: false,
  },
  {
    album: "Sanity Destroyed",
    number: 7,
    title: "Touch The Ground",
    file: "/dist/audio/touch-the-ground.mp3",
    duration: "07:35",
    execute: false,
  },
  {
    album: "Sanity Destroyed",
    number: 8,
    title: "They Still Want To Kill",
    file: "/dist/audio/they-stil-want-to-kill.mp3",
    duration: "05:24",
    execute: false,
  },
];

const musicList = () => {
  const musicListContainer = document.getElementById("music-list");
  musics.forEach((music) => {
    const item = document.createElement("li");
    item.classList.add("my-3");
    item.innerHTML = `<img src="/dist/assets/icons/music_note.svg" alt="note-icon" /> ${music.number} -
            ${music.title}`;

    musicListContainer.appendChild(item);
  });
};

const musicPlayer = () => {
  const playButton = document.querySelector('.control img[alt="play"]');
  const pauseButton = document.querySelector('.control img[alt="pause"]');
  const nextButton = document.querySelector('.control img[alt="next"]');
  const prevButton = document.querySelector('.control img[alt="prev"]');
  const musicName = document.getElementById("music-name");
  const albumName = document.getElementById("album-name");
  const progressBarContainer = document.querySelector(".progress-bar");
  const progressBar = document.querySelector(".progress-bar .progress");
  const currentTimeDisplay = document.querySelector(".current-time");
  const totalTimeDisplay = document.querySelector(".total-time");
  const volumeSlider = document.getElementById("volume-slider");

  let currentIndex = musics.findIndex((music) => music.execute);
  const audio = new Audio();
  let isDragging = false;

  const display = () => {
    const currentMusic = musics[currentIndex];

    if (!currentMusic) return;

    musicName.textContent = `${currentMusic.number} - ${currentMusic.title}`;
    albumName.textContent = `${currentMusic.album}`;
    totalTimeDisplay.textContent = currentMusic.duration;
    progressBar.style.width = "0%";
    currentTimeDisplay.textContent = "00:00";
    audio.src = currentMusic.file;
    audio.load();
  };

  const playMusic = () => {
    pauseButton.classList.remove("d-none");
    playButton.classList.add("d-none");

    audio.play();
  };

  const pauseMusic = () => {
    pauseButton.classList.add("d-none");
    playButton.classList.remove("d-none");
    audio.pause();
  };

  const nextMusic = () => {
    currentIndex = (currentIndex + 1) % musics.length;
    display();
    playMusic();
  };
  const prevMusic = () => {
    currentIndex = (currentIndex - 1 + musics.length) % musics.length;
    display();
    playMusic();
  };

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    const minutes = String(Math.floor(audio.currentTime / 60)).padStart(2, "0");
    const seconds = String(Math.floor(audio.currentTime % 60)).padStart(2, "0");
    currentTimeDisplay.textContent = `${minutes}:${seconds}`;
  });

  audio.addEventListener("ended", nextMusic);

  const handleProgressDrag = (event) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progress = Math.min(Math.max(offsetX / rect.width, 0), 1);
    progressBar.style.width = `${progress * 100}%`;
    const newTime = progress * audio.duration;
    const minutes = String(Math.floor(newTime / 60)).padStart(2, "0");
    const seconds = String(Math.floor(newTime % 60)).padStart(2, "0");
    currentTimeDisplay.textContent = `${minutes}:${seconds}`;
    return newTime;
  };

  progressBarContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    const newTime = handleProgressDrag(event);
    audio.currentTime = newTime;
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      handleProgressDrag(event);
    }
  });

  document.addEventListener("mouseup", (event) => {
    if (isDragging) {
      isDragging = false;
      const newTime = handleProgressDrag(event);
      audio.currentTime = newTime;
    }
  });

  volumeSlider.addEventListener("input", (event) => {
    const volume = event.target.value / 100;
    audio.volume = volume;

    let line = document.querySelector(".line");
    line.style.width = volume;
  });

  audio.volume = volumeSlider.value / 100;

  if (playButton) playButton.addEventListener("click", playMusic);
  if (pauseButton) pauseButton.addEventListener("click", pauseMusic);
  if (nextButton) nextButton.addEventListener("click", nextMusic);
  if (prevButton) prevButton.addEventListener("click", prevMusic);

  display();
};

musicPlayer();
musicList();
