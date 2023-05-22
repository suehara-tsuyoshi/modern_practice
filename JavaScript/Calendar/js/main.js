"use strict";

{
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  function getDateBody(){
    const date = [];
    for(let i=0;i<new Date(year,month+1,0).getDate();i++){
      date.push({
        date:i+1,
        isToday: false,
        isDisable: false,
      });
      if(year===now.getFullYear()&&month===now.getMonth()&&i===now.getDate()-1){
        date[i].isToday = true;
      }
    }
    return date;
  }

  function getDateHead(){
    const date = [];
    const n = new Date(year,month,1).getDay();
    const d = new Date(year,month,0).getDate();
    for(let i=0;i<n;i++){
      date.unshift({
        date: d-i,
        isToday: false,
        isDisable: true,
      });
    }
    return date;
  }

  function getDateTail(){
    const date = [];
    const n = new Date(year,month+1,0).getDay();
    for(let i=n+1;i<7;i++){
      date.push({
        date: i-n,
        isToday: false,
        isDisable: true,
      });
    }
    return date;
  }

  function getWeeks(){
    const date = [
      ...getDateHead(),
      ...getDateBody(),
      ...getDateTail(),
    ];
    const n = date.length;
    const weeks = [];
    for(let i=0;i<n/7;i++){
      const week = [];
      for(let j=0;j<7;j++){
        week[j] = date.splice(0,1)[0];
      }
      weeks[i] = week;
    }
    return weeks;
  }
  function getCalendar(){
    init();
    const dates = getWeeks();
    for(let i=0;i<dates.length;i++){
      const tr = document.createElement('tr');
      for(let j=0;j<7;j++){
        const td = document.createElement('td');
        td.textContent = dates[i][j].date;
        if(dates[i][j].isDisable) td.classList.add('disabled');
        if(dates[i][j].isToday) td.classList.add('isToday');
        tr.appendChild(td);
      }
      const tbody = document.querySelector('tbody');
      tbody.appendChild(tr);
    }
  }
  function init(){
    const tbody = document.querySelector('tbody');
    while(tbody.firstChild){
      tbody.removeChild(tbody.firstChild);
    }
    const title = document.getElementById('title');
    title.textContent = `${year}/${String(month+1).padStart(2,0)}`
  }
  document.getElementById('prev').addEventListener('click',()=>{
    init();
    month--;
    if(month<0){
      year--;
      month = 11;
    }
    getCalendar();
  });
  document.getElementById('next').addEventListener('click',()=>{
    init();
    month++;
    if(month>11){
      year++;
      month = 0;
    }
    getCalendar();
  });
  document.getElementById('today').addEventListener('click',()=>{
    init();
    year = now.getFullYear();
    month = now.getMonth();
    getCalendar();
  });
  getCalendar();

}