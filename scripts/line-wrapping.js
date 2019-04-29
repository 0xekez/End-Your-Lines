function enforceAndGrowWords(text, len) {
  // Replace only single newlines ignoring doubles.
  splits = text.split(/\n\n/g);
  let i;
  for (i = 0; i < splits.length; i++) {
    section = splits[i];
    section = section.replace(/\n/g, " ");
    words = section.split(" ");
    splits[i] = wrapWords(words, len);
  }
  return splits.join("\n\n");
}

function wrapWords(words, len) {
  let goodLines = [];
  while (words.length > 0) {
    let line = []
    while (totalLen(line) < len && words.length > 0) {
      line.push(words.shift());
    }
    goodLines.push(line.join(" "));
  }
  return goodLines.join("\n");
}

function totalLen(list) {
  let i;
  let l = 0;
  for (i = 0; i < list.length; i++) {
    l += list[i].length;
  }
  return l;
}

// handle enter plain javascript
function handleEnter(e){
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      // Enter key has been pressed & textbox is focused
      if ($("#hardtext").is(':focus')) {
        $('#hardtext').val($('#hardtext').val() + "\n");
      }
    }
}

$(document).ready(function(){
  var slider = document.getElementById("custom-handle");
  var value = document.getElementById("slider-value");
  var maxLength = slider.value;
  value.innerHTML = maxLength;
  window.totalEndNewLines = 0;
  slider.oninput = function() {
    maxLength = slider.value;
    value.innerHTML = maxLength;
    $('#hardtext').val(enforceAndGrowWords($('#hardtext').val(), maxLength));
  }
  $('#hardtext').on('input focus keydown keyup', function() {
      let text = $(this).val();
      lines = enforceAndGrowWords(text, maxLength)
      $(this).val(lines);
  });
});
