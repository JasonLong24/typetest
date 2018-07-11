var randomWords = require('random-words');

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
