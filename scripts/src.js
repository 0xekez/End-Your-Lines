var s = 0;
var st = 100;
var direction = -1;

setInterval(function(){
  if (s == 0 || s == 100) {
    direction = direction * (-1);
  }
  s += direction;
  st -= direction;
  document.body.style.backgroundColor = "hsl(300," + s  + "%, 50%)";
  document.getElementById('title').setAttribute('style','transform:rotate('+(360/100)*s+'deg)');
  document.getElementById("title").style.color = "hsl(50," + st  + "%, 50%)";
  document.getElementById("title").style.marginLeft = s + "%";
  document.getElementById("title").style.marginTop = s - 20 + "%";
},(30*(window.screen.width/1440)));
