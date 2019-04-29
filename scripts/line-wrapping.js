/*
Enforces hard line wrapping on words.
*/
function enforceWords(text, len) {
  var lines = text.split(/\n/);
  var goodLines = [];
  var i;
  for (i = 0; i < lines.length; i++) {
    var words = lines[i].split(' ');
    /*
    If a word would cause you to excede the line width,
    just put it there anyway. This is how nano does it.
    */
    var goodStrings = [words[0]];
    var lineLen = words[0].length;
    var j;
    for (j = 1; j < words.length; j++) {
      cannidateLength = words[j].length;
      if (lineLen + cannidateLength > len) {
        goodLines.push(goodStrings.join(' ').trim());
        goodStrings = [words[j]];
        lineLen = words[j].length;
      } else {
      goodStrings.push(words[j]);
      lineLen += words[j].length;
      }
    }
    if (goodStrings.length == 0) {
      goodLines.push("\n");
    } else {
      // Add the trailing good strings
      goodLines.push(goodStrings.join(' '));
    }
  }
  return goodLines.join("\n");
}

function enforceAndGrowWords(text, len) {
  text = text.replace(/\n+/g, function($0) {
        return $0.length == 1 ? ' ' : $0;
    });
  var words = text.split(" ");
  var goodStrings = [words[0]];
  var goodLines = [];
  var lineLen = words[0].length;
  var j;
  for (j = 1; j < words.length; j++) {
    cannidateLength = words[j].length;
    if (lineLen + cannidateLength > len) {
      goodLines.push(goodStrings.join(' ').trim());
      goodStrings = [words[j]];
      lineLen = words[j].length;
    } else {
    goodStrings.push(words[j]);
    lineLen += words[j].length;
    }
  }
  // Add the trailing good strings
  goodLines.push(goodStrings.join(' '));
  return goodLines.join("\n");
}

$(document).ready(function(){
  var slider = document.getElementById("custom-handle");
  var value = document.getElementById("slider-value");
  var maxLength = slider.value;
  slider.oninput = function() {
    maxLength = slider.value;
    value.innerHTML = maxLength;
    $('#hardtext').val(enforceAndGrowWords($('#hardtext').val(), maxLength));
  }
  $('#hardtext').on('input focus keydown keyup', function() {
      var text = $(this).val();
      lines = enforceWords(text, maxLength)
      $(this).val(lines);
  });
});
