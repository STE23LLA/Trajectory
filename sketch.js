function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);
}

const audio = new Audio('audio.mp3');
audio.addEventListener('ended', () => {
  audio.currentTime = 0; // 重置播放进度
  audio.play(); // 重新播放
});
audio.play();  

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let source;

async function initAudio() {
  const response = await fetch('audio.mp3');
  const buffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(buffer);
  
  source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true; // 开启循环
  source.connect(audioContext.destination);
  source.start(0);
}

initAudio();

document.addEventListener('click', () => {
  audio.play().catch(() => console.log('需用户点击后播放'));
})



