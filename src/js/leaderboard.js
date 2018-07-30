var leaderboard = document.getElementById('leaderboard');
var row = 0;
var database = firebase.database();
var ref = database.ref('test');

var NewPlayer = {
  Name:function()
  {

  },
  Score:function()
  {

  },
  WPM:function()
  {

  },
  Add:function(name, acc, wpm)
  {
    var player = []
    var row = document.getElementById('leaderboard').insertRow(1);
    for(var i = 0; i < 3; i ++)
    {
      player = row.insertCell(i);
      switch(i) {
        case 0:
          player.innerHTML = name;
          break;
        case 1:
          player.innerHTML = acc;
          break;
        case 2:
          player.innerHTML = wpm;
          break;
      }
    }
  },
  Push:function()
  {
    ref.once('value', gotData, errData);

    function gotData(data) {
      var scores = data.val();
      var key = Object.keys(scores);
      var iter = key.length;      

      for(i=0; i < iter; i++) {
        var currentKey = key[i];
        var name = scores[currentKey].name;
        if(localStorage.getItem("Username") == name || localStorage.getItem("Username") == "none") {
          console.log("HI");
          if(parseInt(localStorage.getItem("wpm")) > parseInt(scores[currentKey].wpm)) {
            console.log("HI");
            database.ref('test/' + currentKey).set({
              name: localStorage.getItem("Username"),
              acc: localStorage.getItem("acc"),
              wpm: localStorage.getItem("wpm")
            });
          } else {
            run();
            break;
          }
        }
      }
    }
    function errData(err) {
      console.log(err);
    }
    var run = (function() {
      var executed = false;
      return function() {
        if (!executed) {
          executed = true;
          // do something
          var hash = Math.random().toString(36).substring(7);
          console.log("Anonymous" + hash);
          var data = {
            name: "Anonymous" + hash,
            acc: localStorage.getItem("acc"),
            wpm: localStorage.getItem("wpm")
          }
          ref.push(data); 
        }
      };
    })();
  },
  Retrive:function()
  {
    ref.once('value', gotData, errData);

    function gotData(data) {
      console.log(data.val());
      var scores = data.val();
      var key = Object.keys(scores);
      for(i=0; i < key.length; i++) {
        var currentKey = key[i];
        var name = scores[currentKey].name;
        var wpm = scores[currentKey].wpm;
        document.getElementById('leadBody').innerHTML = '';
        NewPlayer.Add(scores[currentKey].name, scores[currentKey].acc, scores[currentKey].wpm);
        NewPlayer.Sort();
      }
    }
    function errData(err) {
      console.log(err);
    }
  },
  Sort:function()
  {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("leaderboard");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("TR");
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

};

NewPlayer.Push();
NewPlayer.Retrive();
NewPlayer.Sort();
// var data = {
//   name: "Jason Long",
//   acc: "40/48",
//   wpm: "64"
// }
// ref.push(data);
// for(var i=0; i<50; i++) {
//   NewPlayer.Add("Player"+i, i+"/48", i);
// }
// for(var i=0; i<50; i++) {
//   NewPlayer.Add("Player"+i, i+"/48", i);
// }
