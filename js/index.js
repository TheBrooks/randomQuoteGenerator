$(document).ready(function() {
  updateQuote();
  $("body").removeClass("fade-out");
  showHidden();

  $("#next-quote").on("click", updateQuote);
  $('#twitter-button').on('click', postTweet);
});

fadeTime = 400;

function showHidden() {
  $(".initially-hidden").removeClass("initially-hidden");
}

function updateQuote() {
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json) {
      var genColor = generateColorString();
      $("body").animate({
          backgroundColor: genColor
        }, fadeTime);
      $(".button").animate({
          backgroundColor: genColor
        }, fadeTime, function() {});
      $('.quotes-container').animate({
          opacity: 0         
        }, fadeTime, function(){
          $('#text').html(json.quoteText);
          $('#author').html(json.quoteAuthor);
        }).animate({
          opacity: 1,
          color: genColor
        }, fadeTime, function(){});
  });
}


function generateColorString() {
  var hue = Math.floor(Math.random() * 255);
  var sat = 32;
  var light = 50;
  return "hsl(" + hue + "," + sat+ "%," + light + "%)";
}

function postTweet() {
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + $("#text").text() + '" ' + $("#author").text() ));
}
