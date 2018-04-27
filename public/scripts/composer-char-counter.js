$(document).ready(function(event) {

  // Loads the character counter
  $('textarea').on('keyup', function(event) {
    const inputLength = $(this).val().length;
    const numberRemain = 140 - inputLength;

    $(this).siblings('.counter').text(numberRemain);
    counter = $(this).siblings('.counter');

  // If user is over the 140 character limit, numbers turn red
    if (numberRemain < 0) {
      counter.css({"color":"red"});
    } else {
      counter.css({"color":"black"});
    }

  });
});