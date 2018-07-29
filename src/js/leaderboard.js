var leaderboard = document.getElementById('leaderboard');
var row = 0;
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
for(var i=0; i<50; i++) {
  NewPlayer.Add("Player"+i, i+"/48", i);
}
