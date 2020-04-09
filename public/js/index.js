var video = document.getElementById("videoBG");
var btn = document.getElementById("videoButton");

function playPause() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}