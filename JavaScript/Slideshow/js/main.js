'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ]
  let currentIndex = 0;

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image,index)=>{
    const img = document.createElement('img');
    img.src = image;
    const li = document.createElement('li');
    if(index===currentIndex) li.classList.add('current');
    li.addEventListener('click',()=>{
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });
    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
    
  });

  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const play = document.getElementById('play');

  next.addEventListener('click',()=>{
    let target = currentIndex+1;
    if(target===images.length) target = 0;
    document.querySelectorAll('.thumbnails > li')[target].click();
  });
  prev.addEventListener('click',()=>{
    let target = currentIndex-1;
    if(target<0) target = image.length-1;
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let isPlaying = false;
  let setTimeId;
  function playSlideshow(){
    setTimeId = setTimeout(()=>{
      next.click();
      playSlideshow();
    },1000);
  }

  play.addEventListener('click',()=>{
    if(isPlaying){
      isPlaying = false;
      play.textContent = "Play";
      clearTimeout(setTimeId);
    }else{
      isPlaying = true;
      play.textContent = "Pause"
      playSlideshow();
    }
  });

}