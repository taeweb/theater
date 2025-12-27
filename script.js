const videos = [
  "aqIWb2wuPwY",
  "4ZifOwHpl-M",
  "mUI0BnDnIxk",
  "H1ZvCqKjEmg",
  "0WtefpzH-qU",
  "vFaU_nUYI-Y",
  "Mw-0liXoau4",
  "8XW5yhWzPac",
  "9zFEEwjnqrU",
  "zzuz8G0xnPI"
];

let player;
let index = 0;

const fade = document.getElementById("fade");
const startBtn = document.getElementById("startBtn");
const curtains = document.querySelectorAll(".curtain");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: videos[index],
    playerVars: {
      autoplay: 0,
      controls: 1,
      fs: 1,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

function onStateChangeWithFade() {
  fade.classList.add("active");
  setTimeout(() => fade.classList.remove("active"), 1000);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    onStateChangeWithFade();
    setTimeout(() => {
      if(index < videos.length - 1){
        index++;
        player.loadVideoById(videos[index]);
      }
    }, 1000);
  }
}

function playClipAt(i) {
  if (i < 0) i = 0;
  if (i >= videos.length) i = videos.length - 1;
  index = i; // อัปเดต index
  fade.classList.add("active");
  setTimeout(() => fade.classList.remove("active"), 500);
  player.loadVideoById(videos[index]);
}

// START IMAX + เปิดม่าน
startBtn.onclick = () => {
  startBtn.style.display = "none";
  curtains.forEach(c => c.classList.add("open"));
  setTimeout(() => player.playVideo(), 1200);
};

// Prev / Next
prevBtn.onclick = () => {
  if (index > 0) playClipAt(index - 1);
};

nextBtn.onclick = () => {
  if (index < videos.length - 1) playClipAt(index + 1);
};
