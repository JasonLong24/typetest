var randomWords = require('random-words');
var amt = 0;
var correct = 0, wrong = 0;

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
  console.log(wordlist[0]); 
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
    document.getElementById("typeInput").value = "";
    document.getElementById("howGood").innerText = "(" + howGood(correct) + ")";
    amt++;
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
