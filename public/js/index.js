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

$("#modalBtnLeft").on("click", function(){
  console.log("click")
  window.location.href = "http://localhost:8080/login.html"
})


$("#modalBtnRight").on("click", function(){
  console.log("click")
  window.location.href = "http://www.eelslap.com/"
})


