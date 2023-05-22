'use strict';
{
  function createCol(col){
    const source = [];
    for(let i=0;i<15;i++){
      source[i] = i+1+15*col;
    }
    const column = [];
    for(let i=0;i<5;i++){
      const n = Math.floor(Math.random()*source.length);
      column[i] = source.splice(n,1)[0];
    }
    return column;
  }
  function createBingo(){
    const bingo = [];
    for(let i=0;i<5;i++){
      bingo[i] = createCol(i);
    }
    bingo[2][2] = "FREE";
    return bingo;
  }
  const bingo = createBingo();
  for(let i=0;i<5;i++){
    const tr = document.createElement('tr');
    for(let j=0;j<5;j++){
      const td = document.createElement('td');
      td.textContent = bingo[j][i];
      tr.appendChild(td);
    }
    const tbody = document.querySelector('tbody');
    tbody.appendChild(tr);
  }
}