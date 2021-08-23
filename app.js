const app = () => {

  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");




  //sounds 
  const sounds = document.querySelectorAll(".sound-picker button");

  const timeDisplay = document.querySelector(".time-display");

  const outlineLength = outline.getTotalLength();

  const timeSelect = document.querySelectorAll(".time-select button")
 


  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;


  //pick different sounds 

  sounds.forEach(sound => {
    sound.addEventListener("click",function(){
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    })
  })


  // play sound 

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // change duration

  timeSelect.forEach( (btn) => {

    btn.addEventListener("click",function (){
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60) }:${Math.floor(fakeDuration % 60) }`;
    });

  });

  const checkPlaying = song => {
    if(song.paused){
      song.play();
      video.play()
      play.src = "./svg/pause.svg";
    
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
    
  }


  song.ontimeupdate = function() {
    let currTime = song.currentTime;
    let currentTime = currTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let mins = Math.floor(elapsed / 60);

    let progress = outlineLength - (currTime / fakeDuration) * outlineLength;

 

    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${mins}:${seconds}`;

    if (currentTime >= fakeDuration){
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }

    
  }; 


};




app();
