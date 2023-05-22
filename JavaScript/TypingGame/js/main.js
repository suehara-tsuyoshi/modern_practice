'use strict';

{
  const words = ['red','blue','pink'];
  const target = document.getElementById('target');

  let word;
  let loc = 0;
  let isPlaying = false;
  let starttime;
  
  target.textContent = 'Click start!';

  function setWord(){
    word = words.splice(Math.floor(Math.random*words.length),1)[0];
    target.textContent = word;
  }
  document.addEventListener('click',()=>{
    if(isPlaying) return;
    isPlaying = true;
    starttime = Date.now();
    setWord();
  });
  document.addEventListener('keydown',e=>{
    if(e.key!==word[loc]) return;
    loc++;
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if(loc===word.length){
      if(words.length===0){
        target.textContent = 'Finished';
        const elapsed = ((Date.now()-starttime)/1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `time: ${elapsed} seconds!`;
        return;
      }
      loc = 0;
      setWord();
    }
  }); 

}