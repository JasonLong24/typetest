var leaderboard = Document.getELementbyId('leaderboard');
var row = 0;
var NewPlayer = {
  Name:function()
  {

  }
  Score:function()
  {

  }
  WPM:function()
  {

  }
  Add:function()
  {
    var player = []
    var row =leaderboard.insertRow(row);
    for(var i = 0; i < 3; i ++)
    {
      player[i] = row.insertCell(i);
    }
    player[0].innerHTML = "Test1";
    player[1].innerHTML = "Test2";
    player[2].innerHTML = "Test3";
  }
};
Console.log(NewPlayer.Add());
