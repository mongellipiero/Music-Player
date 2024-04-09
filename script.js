const titles = ["Love Anthem, No.1",
                "Al buio un po' mi perdo",
                "Fulmini/Il fu Venerus",
                "Forse ancora dorme"]

const authors = ["Venerus, MACE",
                 "Venerus, MACE",
                 "Venerus",
                 "Venerus, MACE"]

/* They could be different */
const covers = ["cover.jpg", "cover.jpg", "cover.jpg", "cover.jpg"]

const totalSongs = 4;
let currentSong = 0;
changeSong(0);

function prevSong() {
    currentSong = currentSong-1;
    if(currentSong < 0) {
        currentSong = totalSongs-1;
    }
    changeSong(currentSong);
}

function nextSong() {
    currentSong = currentSong+1;
    currentSong = currentSong%totalSongs;
    changeSong(currentSong);
}

function changeSong(i) {
    document.getElementById("songTitle").textContent = titles[i];
    // document.getElementById("songTitle").start();
    document.getElementById("songAuthor").textContent = authors[i];
}

const audio = document.getElementById('musicPlayer');
const progressSlider = document.getElementById('progressSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const totalDurationDisplay = document.getElementById('totalDuration');
let isPlaying = false;

// Play/Pause toggle function
function togglePlayPause() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (isPlaying) {
        audio.pause();
        playPauseIcon.classList.remove('bi-pause-circle-fill');
        playPauseIcon.classList.add('bi-play-circle-fill');
    } else {
        audio.play();
        playPauseIcon.classList.remove('bi-play-circle-fill');
        playPauseIcon.classList.add('bi-pause-circle-fill');
    }
    isPlaying = !isPlaying;
}

document.getElementById('playButton').addEventListener('click', togglePlayPause);

// Format time to display as minutes:seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Display total duration once the audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
});

// Update current time and progress bar as the audio plays
audio.addEventListener('timeupdate', function () {
    const percentage = (this.currentTime / this.duration) * 100;
    progressSlider.value = percentage;
    currentTimeDisplay.textContent = formatTime(this.currentTime);
});

// Update the current time when the user seeks
progressSlider.addEventListener('input', function () {
    const seekTime = (audio.duration / 100) * progressSlider.value;
    audio.currentTime = seekTime;
});

// Handle audio ending
audio.onended = function () {
    const playPauseIcon = document.getElementById('playPauseIcon');
    playPauseIcon.classList.remove('bi-pause-circle-fill');
    playPauseIcon.classList.add('bi-play-circle-fill');
    progressSlider.value = 0;
    currentTimeDisplay.textContent = formatTime(0);
    isPlaying = false;
    nextSong();
};

// Volume Control remains unchanged
document.getElementById('volumeControl').addEventListener('input', function () {
    audio.volume = this.value;
});