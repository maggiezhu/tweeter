/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement(twtobj){
  //create an article html elemet to be append to .tweetContainer class

  const username = twtobj.user.name;
  const imagelink = twtobj.user.avatars.regular;
  const content = twtobj.content.text;
  const timecreated = twtobj.created_at;
  const timedifference = Date.now()- timecreated;
  const useraccount = twtobj.user.handle;
  let time;
  var tweet = $(document).find('#template').clone();
  tweet.css('display','block')
  tweet.find('img').attr('src',imagelink);
  tweet.find('.username').text(username);
  tweet.find('.useraccount').text(useraccount);
  tweet.find('p').text(content);
  if(timedifference/(1000*60*60)>=1){
    //created hours ago
    time = `${Math.round(timedifference/(1000*60*60))} hours ago`;
  }else if (timedifference<1000) {
    //just created
    time = 'Just now'
  }
  else{
    //created minutes ago
    time = `${Math.round(timedifference/(1000*60))} mins ago`;
  }
  tweet.find('footer span').text(time);
  return tweet;//<article> contain all html of that article
}

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
function renderTweets(tweets) {
  let tweet;
  for(obj of tweets){
    tweet = createTweetElement(obj);
    $('.tweetContainer').append(tweet);
  }
}


$(document).ready(function() {

   //Get method
   function loadTweets(){
    //make sure all the response is revceived and get the data from it
    //by using .done callback function
    $.ajax({url: '/tweets', type: 'get'}).done(function(data,status,response){

      //render the tweets directly
      renderTweets(data);
    });
    //retuens all tweets in db in JSON file
  }
  loadTweets();


//new tweet submit event handler
  var $submitForm = $('#submitForm');
  $submitForm.on('submit',function(event){
    event.preventDefault();

    //check if the word limit is met
    if(($(this).serialize().length-5)>140){
      $('#exceedLimit').css('display','block');
    }else if(($(this).serialize().length-5)==0){
      $('#emptyError').css('display','block');
    }else{
      // post /tweet to server to save the new tweet
      $.ajax({url: '/tweets',
        type: 'post',
        data: $(this).serialize()
      })
      .done(function(data,status,response){
         console.log('in the done function', data);
         tweet = createTweetElement(data);
         $('.tweetContainer').prepend(tweet);
         $('#exceedLimit').css('display','none');
         $('#emptyError').css('display','none');
      });
    }
  });


  //Compose button handler
  $('.composeButton').on('click',function(e){
    e.preventDefault();

    //if new tweet element is hidden, show and focus
    //if is not hidden, hide it
    console.log($('.new-tweet').css('display')=='block');
    if($('.new-tweet').css('display')=='block'){
      $('.new-tweet').css('display','none');
      $('html, body').animate({scrollTop:80}, '300');
    }else{
      $('.new-tweet').css('display','block');
      $('html, body').animate({scrollTop:0}, '300');
      $( "#textarea" ).focus();
    }
  });
});


















