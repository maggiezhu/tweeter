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
  const useraccount = twtobj.user.handle;
  var tweet = $(document).find('#template').clone();
  tweet.css('display','block')
  tweet.find('img').attr('src',imagelink);
  tweet.find('.username').text(username);
  tweet.find('.useraccount').text(useraccount);
  tweet.find('p').text(content);
  tweet.find('footer span').text(timecreated);
  return tweet;//<article> contain all html of that article
}

function renderTweets(tweets) {
  console.log(tweets);
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  let tweet;

  for(obj of tweets){

    tweet = createTweetElement(obj);
    // console.log('in render Tweets',tweet);
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

  //make input box auto adjust size?
  //and set new tweet <p> element's size


  // <!-- use jQuery to handel submit request -->
  // <!-- has to stop as form, instead of button, otherwise bubbling/hitenter wont work -->
  //event listener for form submission
  var $submitForm = $('#submitForm'); //$('#submitbutton').submit(function
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
         //this new created tweet is sent back as data
         //insert this to the container html
         console.log('in the done function', data);
         tweet = createTweetElement(data);
         $('.tweetContainer').prepend(tweet);
         $('#exceedLimit').css('display','none');
         $('#emptyError').css('display','none');

      })//somehow this will be accssed by
      //req.body.text;
      //the send a new get request to get new list of tweets
    }
  });


  //Compose button onlick jump to new tweet
  $('.composeButton').on('click',function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    $( "#textarea" ).focus();
  });
});


















