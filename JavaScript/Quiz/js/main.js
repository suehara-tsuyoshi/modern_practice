'use strict';

{
  const q = document.getElementById('q');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result'); 
  const scorelabel = document.querySelector('#result > p')

  const quizSet = shuffle([
    {q:"世界一大きい湖は?" ,c:["カスピ海","琵琶湖","ビクトリア湖"]},
    {q:"2の8乗は？" ,c:["256","128","512"]},
    {q:"次のうち最初にリリースされた言語は？" ,c:["Python","JavaScript","HTML"]},
  ]);

  let cur = 0;
  let score = 0;
  let isAnswered;

  function checkAnswer(li){
    if(isAnswered) return;
    isAnswered = true;
    btn.classList.remove('disabled')
    if(li.textContent === quizSet[cur].c[0]){
      li.classList.add('correct');
      score++;
    }else{
      li.classList.add('wrong');
    }
  }
  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      let j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }

  function setQuiz(){
    isAnswered = false;
    btn.classList.add('disabled');
    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    const shuffleSet = shuffle([...quizSet[cur].c]);
    q.textContent = quizSet[cur].q;
    shuffleSet.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click',()=>{
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    if(cur===quizSet.length-1){
      btn.textContent = "Show Score";
    }
  }

  btn.addEventListener('click',()=>{
    if(btn.classList.contains('disabled')) return;
    if(cur===quizSet.length-1){
      result.classList.remove('hidden');
      scorelabel.textContent = `score: ${score}/${quizSet.length}`
    }else{
      cur++;
      setQuiz();
    }
  })

  setQuiz();

}