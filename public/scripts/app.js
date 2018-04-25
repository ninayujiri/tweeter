/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Database
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


// Append each Tweet to the Container
function renderTweets(tweets) {
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

    $("<p>").addClass("time-stamp").text(tweet.created_at).appendTo($footer);

    $tweet.append($footer);

  return $tweet;
};

renderTweets(data);

});

