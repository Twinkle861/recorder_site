// import * as fs from 'fs';

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const save = document.getElementById("save");
// const play = document.getElementsByClassName("play");
// const delete1 = document.getElementsByClassName("delete1");
const video = document.querySelector("video");
// let downloadButton = document.getElementById("downloadButton");

// const video = document.getElementById("myvid");
// const share = document.getElementsByClassName("share");
// const edit = document.getElementsByClassName("edit");

// const video;
// const button = document.getElementsByTagName("button");
// console.log(button);
// console.log(delete1);
// console.log(video);

let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
    audio: { mediaSource: "screen" }
    // audio:true
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
    // audio.src = URL.createObjectURL(completeBlob);
    save.href = video.src;
    save.download = "RecordedVideo.mp4";
  };
  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
  console.log(video);
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  // console.log(video);
  stream.getVideoTracks()[0].stop(); 
  // stream.getAudioTracks()[0].stop();  


});

save.addEventListener("click",(event)=>{
  console.log("saved");

});

// for(var i=0;i<delete1.length;i++){
// delete1[i].addEventListener("click",(event)=>{
//   console.log(event.srcElement);
//   console.log("delete");
// });
// }

// for(var i=0;i<play.length;i++){
// play[i].addEventListener("click",()=>{
//   console.log("play");
// });
// }

// for(var i=0;i<share.length;i++){
// share[i].addEventListener("click",()=>{
//   console.log("share");
// });
// }

// for(var i=0;i<edit.length;i++){
// edit[i].addEventListener("click",()=>{
//   console.log("edit");
// });
// }
