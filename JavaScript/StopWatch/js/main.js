'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let starttime,timeoutId;
  let elapsedtime = 0;

  function countUp(){
    const d = new Date(Date.now()-starttime+elapsedtime);
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();
    timer.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(ms).padStart(3,'0')}`;
    timeoutId = setTimeout(()=>{countUp()},10);
  }

  start.addEventListener('click',()=>{
    if(start.classList.contains('inactive')) return;
    setButtonStateRunning();
    starttime = Date.now();
    countUp();
  });
  stop.addEventListener('click',()=>{
    if(stop.classList.contains('inactive')) return;
    setButtonStateStopped();
    elapsedtime += Date.now()-starttime;
    clearTimeout(timeoutId);
  });
  reset.addEventListener('click',()=>{
    if(reset.classList.contains('inactive')) return;
    setButtonStateInitial();
    elapsedtime = 0;
    timer.textContent = '00:00:000';
  });

  function setButtonStateInitial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
    // start.disabled = false;
    // stop.disabled = true;
    // reset.disabled = true;
  }
  function setButtonStateRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
    // start.disabled = true;
    // stop.disabled = false;
    // reset.disabled = true;
  }
  function setButtonStateStopped(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
    // start.disabled = false;
    // stop.disabled = true;
    // reset.disabled = false;
  }
  setButtonStateInitial();
  
}