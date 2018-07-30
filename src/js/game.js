var randomWords = require('random-words');
var amt = 0;
var correct = 0, wrong = 0;
var elapsed = '0.0';

window.getCheckedValue = function() {
  let radios = document.getElementsByTagName('input');
  let value;
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio' && radios[i].checked) {
      value = radios[i].value;
    }
  }
  return value;
}

window.genRandWord = function(amount) {
  console.log(randomWords(amount)); 
}

window.onSubmit = function() {
  var val = parseInt(getCheckedValue());
  var words = randomWords(val);
  localStorage.setItem("wordList", words);
  localStorage.setItem("wordListLength", words.length);
}

window.parseWordList = function(num) {
  var wordlist = localStorage.getItem("wordList").split(',');
  return wordlist[num];
}

window.onTypeLoad = function() {
  for (var i=0; i < localStorage.getItem("wordListLength"); i++) {
    var createE = document.createElement("SPAN");
    createE.setAttribute("id", "word" + i);
    var createN = document.createTextNode(" " + parseWordList(i) + " ");
    createE.appendChild(createN);
    document.getElementById('words').appendChild(createE);
  }
}

window.startTest = function(event) {
  var keyType = event.which || event.keyCode;
  var targetWord = document.getElementById("word" + amt).innerText;
  var inputWord = document.getElementById("typeInput").value;
  timer();
  console.log(howGood(correct));

  if(keyType == 32) {
    if(inputWord.trim() == targetWord.trim()) {
      correct++;
      document.getElementById("word" + amt).style.color = "green";
      document.getElementById("correct").innerText = correct + "/" + localStorage.getItem("wordListLength");
    } else {
      wrong++;
      document.getElementById("word" + amt).style.color = "red";
      document.getElementById("incorrect").innerText = wrong;
    }
    document.getElementById("wpm").innerText = wordsPerMin() + " wpm";
    document.getElementById("typeInput").value = "";
    document.getElementById("howGood").innerText = "(" + howGood(correct) + ")";
    amt++;
    endTest();
  }
  document.getElementById("word" + amt).style.color = "yellow";
}

window.howGood = function(cor) {
  switch(true) {
    case cor < localStorage.getItem("wordListLength") / 3:
      return "Poor";
      break;
    case cor < localStorage.getItem("wordListLength") / 2:
      return "Good";
      break;
    case cor >= localStorage.getItem("wordListLength") / 1.5:
      return "Excellent";
      break;
    case cor = localStorage.getItem("wordListLength"):
      return "Perfect";
      break;
    default:
      return "Good";
  }
}

var exec = false;
window.timer = function() {
  if(!exec) {
    exec = true;
    var start = new Date().getTime();

    window.setInterval(function() {
      var time = new Date().getTime() - start;
      elapsed = Math.floor(time / 100) / 10;
      if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
      document.getElementById("timer").innerText = elapsed + "s";
    }, 100);
  }
}

window.wordsPerMin = function() {
  var words = (correct / elapsed) * 60;
  return words.toFixed(2);
} 

window.endTest = function() {
  if(amt == localStorage.getItem("wordListLength")) {
    console.log("Game Over");
    window.clearInterval(2);
    var parent = document.getElementById("bottom-container");
    var child = document.getElementById("typeInput");
    parent.removeChild(child);
    document.getElementById("bottom-gameover").style.background = "#cc0000";  
    document.getElementById("gameover-text").innerText = "Press escape to leave the game.";
    localStorage.setItem("wpm", wordsPerMin());
    localStorage.setItem("acc", correct + "/" + localStorage.getItem("wordListLength"));
    console.log(correct);
    window.onkeyup = function(e) {
      var key = e.keyCode ? e.keyCode : e.which;
      if (key == 27) {
        console.log("Escape Pressed!");
        document.location.href = "leaderboard.html";
      }
    }
  }
}
