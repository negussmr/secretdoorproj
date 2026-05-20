const container = document.getElementById("lyrics-container");
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '200',
    width: '300',
    videoId: 'f9HF0DJ1cu8',
    playerVars: { autoplay: 0, controls: 1 },
    events: { onReady: startLyrics }
  });
}

const lyrics = [
  { time: 8.24,   text: "Fools on parade cavort and carry on for waiting eyes" },
  { time: 14.61,  text: "That you would rather be beside than in front of" },
  { time: 18.59,  text: "But she's never been the kind to be hollowed by the stares" },
  { time: 41.17,  text: "She swam out of tonight's phantasm" },
  { time: 45.42,  text: "Grabbed my hand and made it very clear" },
  { time: 51.53,  text: "There's absolutely nothing for us here" },
  { time: 56.86,  text: "It's a magnolia celebration to be attempted on a Wednesday night" },
  { time: 61.13,  text: "It's better than to get a reputation as a miserable little tyke" },
  { time: 65.38,  text: "At least that's the conclusion she came to in this overture" },
  { time: 73.88,  text: "And the secret door swings behind us" },
  { time: 80.00,  text: "She's saying nothing, she's just giggling along" },
  { time: 91.16,  text: "Her arms were folded most indignant" },
  { time: 95.14,  text: "Not looking like she was soon to leave" },
  { time: 101.25, text: "I had to squint in order to believe" },
  { time: 106.29, text: "And then like a butler pushing on a bookshelf" },
  { time: 108.96, text: "Unveiling the unexpected" },
  { time: 111.08, text: "I, who was earlier reluctant" },
  { time: 112.67, text: "Was suddenly embarrassed and corrected" },
  { time: 115.06, text: "How could such a creature survive in such a habitat?" },
  { time: 124.36, text: "And the secret door swings behind us" },
  { time: 129.67, text: "She's saying nothing, she's just giggling along" },
  { time: 138.97, text: "Even if they were to find us" },
  { time: 144.55, text: "I wouldn't notice, I'm completely occupied" },
  { time: 152.25, text: "As all the fools on parade cavort and carry on for waiting eyes" },
  { time: 159.95, text: "Ones you would rather be beside than in front of" },
  { time: 163.67, text: "But she's never been the kind to be hollowed by the stares" },
  { time: 167.92, text: "Fools on parade frolic and fuck about to make her gaze" },
  { time: 174.56, text: "Turn to a scribble on a page by a picture that holds her absence" },
  { time: 180.67, text: "But you're daft to think she'd care" },
  { time: 182.80, text: "Fools on parade" },
  { time: 190.25, text: "Fools on parade" },
  { time: 197.43, text: "Fools on parade" },
  { time: 200.35, text: "Conduct a sing-along" },
];

const positions = [
  { x: 2,  y: 4  }, { x: 33, y: 4  }, { x: 62, y: 4  },
  { x: 2,  y: 33 }, { x: 33, y: 33 }, { x: 62, y: 33 },
                     { x: 33, y: 62 }, { x: 62, y: 62 },
];

let posIndex = 0;
let shownLyrics = [];
let intervalId = null;

function startLyrics() {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (!player || typeof player.getCurrentTime !== "function") return;
    const current = player.getCurrentTime();

    lyrics.forEach((line, index) => {
      if (current >= line.time && !shownLyrics.includes(index)) {
        shownLyrics.push(index);

        const pos = positions[posIndex % positions.length];
        posIndex++;

        const div = document.createElement("div");
        div.className = "lyric";
        div.style.left = (pos.x + (Math.random() * 6 - 3)) + "%";
        div.style.top  = (pos.y + (Math.random() * 6 - 3)) + "%";
        div.style.zIndex = 20 + shownLyrics.length;

        const rotation = Math.random() * 10 - 5;
        div.style.setProperty('--rot', rotation + 'deg');

        const titlebar = document.createElement("div");
        titlebar.className = "lyric-titlebar";

        const titleSpan = document.createElement("span");
        titleSpan.textContent = "🚪 secret_door.mp3";

        const btns = document.createElement("div");
        btns.className = "lyric-titlebar-buttons";
        ["_", "□"].forEach(t => {
          const s = document.createElement("span");
          s.textContent = t;
          btns.appendChild(s);
        });
        const closeBtn = document.createElement("span");
        closeBtn.textContent = "✕";
        closeBtn.onclick = () => div.remove();
        btns.appendChild(closeBtn);

        titlebar.appendChild(titleSpan);
        titlebar.appendChild(btns);

        const body = document.createElement("div");
        body.className = "lyric-body";
        body.textContent = line.text;

        div.appendChild(titlebar);
        div.appendChild(body);
        container.appendChild(div);
      }
    });
  }, 100);
}