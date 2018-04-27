$(document).ready(function() {

  $("textarea").focus();

  // Append each Tweet to the Container
  function renderTweets(tweets) {
    $('#tweets').empty();
    for (let currentTweet of tweets) {
      $('#tweets').append(createTweetElement(currentTweet));
    }
  };


  // Creates a single tweet
  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet')
      const $header = $("<header>");
      const $footer = $("<footer>");
      const $span = $("<span>").addClass("icons");

      $("<img>").attr('src', tweet.user.avatars.small).appendTo($header);
      $("<p>").addClass("handle").text(tweet.user.handle).appendTo($header);
      $("<h2>").addClass("name").text(tweet.user.name).appendTo($header);

      $tweet.append($header);

      $("<h4>").text(tweet.content.text).appendTo($tweet);

      $("<i>").addClass("fas fa-heart").appendTo($span);
      $("<i>").addClass("fas fa-retweet").appendTo($span);
      $("<i>").addClass("fas fa-flag").appendTo($span);

      $footer.append($span);

      $("<p>").addClass("time-stamp").text(moment.utc(tweet.created_at).fromNow()).appendTo($footer);

      $tweet.append($footer);

    return $tweet;
  };


  // AJAX POST request
  $('form').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetContent = ($.trim($(this.text).val()));

    if (tweetContent.length === 0) {
      $(function() {
        setTimeout(function() { $(".new-tweet .error").fadeOut(1500); }, 5000)
        $(".new-tweet .error").show();
        setTimeout(function() { $(".new-tweet .error").fadeOut(1500); }, 5000)
      });
      var $errMsg = "You submitted an empty tweet! Try again.";
    }

    if (tweetContent.length > 140) {
      $(function() {
        setTimeout(function() { $(".new-tweet .error").fadeOut(1500); }, 5000)
        $(".new-tweet .error").show();
        setTimeout(function() { $(".new-tweet .error").fadeOut(1500); }, 5000)
      });

      var $errMsg = "Your tweet is too long!";
      event.preventDefault();
      return $(".new-tweet .error").text($errMsg);
    }


    $(".new-tweet .error").text($errMsg);
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: data
    })
    .done(function (response) {
      $('#tweets').prepend(createTweetElement(response));
      $('form')[0].reset();
      $('.counter').text(140);
    })
    .fail(function () {
      console.log("request rejected");
    })
    .always(function (){
      console.log("request completed");
    })
  });


  // Toggle function when Compose button is clicked
  $( ".compose-button" ).click(function() {
    $( ".new-tweet" ).slideToggle();
    $("textarea").focus();
  });


  // Gets tweets from the Tweets page
  function loadTweets() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function(data) {
        renderTweets(data.reverse());
      }
    })

  };

  loadTweets();

});

