$(function() {

  $('form').on('submit', function (event) {
    event.preventDefault();
    const data = $( this ).serialize();

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: data

    }).done(function () {
      alert( "success" )
    }).fail(function () {
      alert( "fail" )
    })

  });
});
