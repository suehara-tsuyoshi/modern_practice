'use strict';

{
  const btn = document.getElementById('btn')
  btn.addEventListener('click',()=>{
    const data = ['大吉','中吉','末吉','凶'];
    const n = Math.floor(Math.random()*data.length);
    btn.textContent = data[n];
  });
}