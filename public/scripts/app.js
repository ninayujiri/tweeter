$(document).ready(function() {

  // Appends each Tweet to the Container
  function renderTweets(tweets) {
    $('#tweets').empty();
    for (let currentTweet of tweets) {
      $('#tweets').append(createTweetElement(currentTweet));
    }
  };

  // Produces and fades out error messages
  function errorMsg() {
    setTimeout(function() { $(".new-tweet .error").fadeOut(1000); }, 2000)
    $(".new-tweet .error").show();
    setTimeout(function() { $(".new-tweet .error").fadeOut(1000); }, 2000)
  };

  // Creates a single tweet
  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass('tweet')
    const $header = $("<header>");
    const $footer = $("<footer>");
    const $span   = $("<span>").addClass("icons");
    const $timeStamp = moment.utc(tweet.created_at).fromNow();

    // Tweet header
    $("<img>").attr('src', tweet.user.avatars.small).appendTo($header);
    $("<p>").addClass("handle").text(tweet.user.handle).appendTo($header);
    $("<h2>").addClass("name").text(tweet.user.name).appendTo($header);
    $tweet.append($header);

    // Tweet body
    $("<h4>").text(tweet.content.text).appendTo($tweet);

    // Tweet footer
    $("<i>").addClass("fas fa-heart").appendTo($span);
    $("<i>").addClass("fas fa-retweet").appendTo($span);
    $("<i>").addClass("fas fa-flag").appendTo($span);

    $footer.append($span);

    $("<p>").addClass("time-stamp").text($timeStamp).appendTo($footer);

    $tweet.append($footer);
    return $tweet;
  };

  $('form').on('submit', function (event) {
    const data = $(this).serialize();
    const tweetContent = ($.trim($(this.text).val()));

    // Checks to make sure tweet form is not empty or over 140 characters
    if (tweetContent.length === 0) {
      var $errMsg = "You submitted an empty tweet! Try again.";
      errorMsg($errMsg);
    }

    if (tweetContent.length > 140) {
      var $errMsg = "Your tweet is too long!";
      errorMsg($errMsg);
      event.preventDefault();
      return $(".new-tweet .error").text($errMsg);
    }

    event.preventDefault();

    // Posts the tweet, prepends it to the container and clears the form/ counter
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
      $(".new-tweet .error").text($errMsg);
    })
  });

  // Toggle function when Compose button is clicked
  $("#compose-button").click(function() {
    $(".new-tweet").slideToggle();
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

  // Loads the tweets as soon as user lands on the page
  loadTweets();

  // Focuses on the text area as soon as the page loads
  $("textarea").focus();

});

