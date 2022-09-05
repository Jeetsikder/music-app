console.log("Iam play");
let golobalSong = 0;

let masterPlay = document.getElementById("masterPlay");
let audioElement = new Audio("songs/1.mp3");
let songContainer = document.getElementById("songContainer");
let songNameControlPanel = document.getElementById("songNameControlPanel");
let myProgressBar = document.getElementById("myProgressBar");
// let songItemPlay = document.querySelectorAll(".songItemPlay");
let songItemPlay = document.getElementsByClassName("songItemPlay");
let song = "";
let songs = [
  {
    songName: "King - Tu Aake Dekhle",
    filPath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },

  {
    songName: "Ranjha – Official Video | Shershaah",
    filPath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },

  {
    songName: "Radhe Title Track | Radhe - Your Most Wanted Bhai ",
    filPath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },

  {
    songName: "Dhadhang Dhang",
    filPath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },

  {
    songName: "Bhool Bhulaiyaa Title Track",
    filPath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },

  {
    songName: "Laila main laila",
    filPath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },

  {
    songName: "SAKHIYAAN",
    filPath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },

  {
    songName: "Dil Na Diya | Krish",
    filPath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },

  {
    songName: "Humko Sirf Tumse Pyaar Hai",
    filPath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
];
// MY FUNCTION
const makeAllPlay = function () {
  Array.from(songItemPlay).forEach((e) => {
    e.classList.add("ri-play-circle-fill");
    e.classList.remove("ri-pause-circle-line");
  });
};

const controlPanelSongName = function (i) {
  songs.forEach((element, I, array) => {
    console.log(array[1].songName);
    songNameControlPanel.innerText = array[i].songName;
  });
};

const timeUpdateElement = function () {
  let timeStamp = document.getElementsByClassName("timeStamp");
  Array.from(timeStamp).forEach((element) => {
    element.innerHTML = " ";
  });
};

// NAV BTN
let NavePlayBtn = document.getElementById("NavePlayBtn");
NavePlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  audioElement.play();
  masterPlay.classList.add("ri-pause-circle-line");
  masterPlay.classList.remove("ri-play-circle-line");
  document.getElementById("gif").style.opacity = "1";
});

// controlPanel();
let html = "";
let songname = "";
songs.forEach((element, i) => {
  //   console.log(element);

  let newHtml = ` <div class="col-lg-9 col-12 fs-5 mt-3">
                    <div
                        class="song-item d-flex align-items-center justify-content-between text-white px-3 py-3 rounded-4"
                    >
                        <img src="${element.coverPath}" class="" alt="" />
                        <p class="">${element.songName}</p>
                        <p class="timeStamp" id="timeUpdate${i + 1}"></p>
                        <div class="icon icons">
                        <i class="ri-play-circle-fill songItemPlay"></i>
                        </div>
                    </div>
                    </div>`;
  let songHtml = `${element.songName[golobalSong]}`;
  html += newHtml;
});
songContainer.innerHTML = html;

// MASTER PLAY
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime < 0) {
    audioElement.play();
    masterPlay.classList.add("ri-pause-circle-line");
    masterPlay.classList.remove("ri-play-circle-line");
    document.getElementById("gif").style.opacity = "1";
  } else {
    audioElement.pause();
    masterPlay.classList.remove("ri-pause-circle-line");
    masterPlay.classList.add("ri-play-circle-line");
    document.getElementById("gif").style.opacity = "0";
  }
});

// VOLUME
let rngVolume = document.getElementById("rngVolume");
window.onload = function () {
  let rangeValueOutput = document.getElementById("rangeValueOutput");
  let volume = parseInt(rngVolume.value * 100);
  rangeValueOutput.innerText = `${volume}%`;
};

rngVolume.addEventListener("change", () => {
  console.log(rngVolume.value);
  audioElement.volume = rngVolume.value;

  let rangeValueOutput = document.getElementById("rangeValueOutput");
  let volume = parseInt(rngVolume.value * 100);
  rangeValueOutput.innerText = `${volume}%`;
});

// TIME UPDATE
audioElement.addEventListener("timeupdate", () => {
  //   console.log("time update");
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
  document.getElementById("rangevalue").innerText = `${progress}%`;
  //   console.log(progress);

  // UPDATE INDIVIDUAL ELEMENT
  let timeUpdate = document.getElementById(`timeUpdate${golobalSong}`);
  let currentSongTime = audioElement.currentTime / 60;
  currentSongTime = `${Math.floor((currentSongTime * 100) / 60)}:${
    Math.floor((currentSongTime * 100) % 60).toString().length === 1
      ? "0" + Math.floor((currentSongTime * 100) % 60)
      : Math.floor((currentSongTime * 100) % 60)
  }`;
  console.log(
    `Current Song Time m:${Math.floor((currentSongTime * 100) / 60)} s:${
      Math.floor((currentSongTime * 100) % 60).toString().length === 1
        ? "0" + Math.floor((currentSongTime * 100) % 60)
        : Math.floor((currentSongTime * 100) % 60)
    }`
  );
  timeUpdateElement();
  timeUpdate.innerText = currentSongTime;
});

// CHANGE CURRENT TIME
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// INDIVIDUAL SONG PLAY BUTTON
Array.from(songItemPlay).forEach((element, i) => {
  //   console.log(element, i);
  element.addEventListener("click", () => {
    makeAllPlay();
    element.classList.add("ri-pause-circle-line");
    element.classList.remove("ri-play-circle-fill");

    // AUDIO LINK UPDATE
    golobalSong = i + 1;
    audioElement.src = `songs/${golobalSong}.mp3`;

    audioElement.play();

    document.getElementById("gif").style.opacity = "1";
    controlPanelSongName(i);

    // MASTER PLAY UPDATE
    masterPlay.classList.add("ri-pause-circle-line");
    masterPlay.classList.remove("ri-play-circle-line");

    masterPlay.addEventListener("click", () => {
      if (audioElement.paused || audioElement.currentTime < 0) {
        element.classList.remove("ri-pause-circle-line");
        element.classList.add("ri-play-circle-fill");
        // console.log(i);
      } else {
        makeAllPlay();
        element.classList.add("ri-pause-circle-line");
        element.classList.remove("ri-play-circle-fill");
      }
    });
  });
});

// NEXT
document.getElementById("next").addEventListener("click", () => {
  if (golobalSong >= 9) {
    golobalSong = 0;
  }
  golobalSong++;
  // console.log(`Next GlobalSong ${golobalSong}`);
  audioElement.src = `songs/${golobalSong}.mp3`;
  audioElement.play();
  masterPlay.classList.add("ri-pause-circle-line");
  masterPlay.classList.remove("ri-play-circle-line");
  document.getElementById("gif").style.opacity = "1";

  Array.from(songItemPlay).forEach((element, i, array) => {
    i = golobalSong - 1;
    // console.log(`i= ${i}`);
    // console.log(array[i], i);
    makeAllPlay();
    array[i].classList.add("ri-pause-circle-line");
    array[i].classList.remove("ri-play-circle-fill");
    // console.log(`globalSong:- ${golobalSong}`);
    controlPanelSongName(i);
  });
});

// PREVIOUS
document.getElementById("previous").addEventListener("click", () => {
  if (golobalSong <= 1) {
    golobalSong = 10;
  }
  golobalSong--;
  console.log(`Previous GlobalSong ${golobalSong}`);
  audioElement.src = `songs/${golobalSong}.mp3`;
  audioElement.play();
  masterPlay.classList.add("ri-pause-circle-line");
  masterPlay.classList.remove("ri-play-circle-line");
  document.getElementById("gif").style.opacity = "1";

  Array.from(songItemPlay).forEach((element, i, array) => {
    i = golobalSong - 1;
    console.log(i);
    console.log(array[i]);
    makeAllPlay();
    array[i].classList.add("ri-pause-circle-line");
    array[i].classList.remove("ri-play-circle-fill");
    controlPanelSongName(i);
  });
});
