$(document).ready(function(event) {
  $('textarea').on('keyup', function(event) {
    const inputLength = $(this).val().length;
    const numberRemain = 140 - inputLength;

    $(this).siblings('.counter').text(numberRemain);
    counter = $(this).siblings('.counter');

    if (numberRemain < 0) {
      counter.css({"color":"red"});
    } else {
      counter.css({"color":"black"});
    }

  });
});