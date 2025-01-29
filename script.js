// Audio player setup
const audio = new Audio();
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('songTitle');
const artistNameEl = document.getElementById('artistName');
const albumCoverEl = document.getElementById('albumCover');

// Song list
const songList = document.getElementById('songList');
const songs = Array.from(songList.querySelectorAll('li'));

// Variables
let isPlaying = false;
let currentSongIndex = 0;

// Play/pause functionality
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  }
  isPlaying = !isPlaying;
});

// Update progress and time
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Load song
function loadSong(songData) {
  audio.src = songData.dataset.song;
  songTitleEl.textContent = songData.dataset.title;
  artistNameEl.textContent = songData.dataset.artist;
  albumCoverEl.src = songData.dataset.cover;
}

// Handle song selection
songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(song);
    audio.play();
    playPauseBtn.textContent = '⏸️';
    isPlaying = true;
  });
});

// Format time helper function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize the first song
loadSong(songs[currentSongIndex]);