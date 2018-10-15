
$(document).ready(function() {
  // --- our code goes here ---


  $('textarea').on('keyup',function(event){
    var charleft = 140-$(this).val().length;

    $(this).siblings('span').text(charleft);
    if(charleft<0){
      $(this).siblings('span').css('color','red');
    }else{
      $(this).siblings('span').css('color','black');
    }

  });

});

