var test,testTimer,min,sec,testFinished=false;

$('.feed-links').css('display','none');


$(document).ready(function(){

 $('body').on('click','.menu-icon',function(){
	$('.leftbar').html("<ul class='nav'>"+$('header div.nav').html()+'</ul>');
	$('.leftbar').css({"width":"200px"}) ;
	$('.container').css({"margin-right":"-200px"});
        $(this).addClass('active'); 
  });
 $('body').on('click','.menu-icon.active',function(){
	$('.leftbar').html("");
	$('.leftbar').css({"width":"0px"}) ;
	$('.container').css({"margin-right":"0px"});
        $(this).removeClass('active'); 
  });
 // TABBED PANELS
 $('body').on('click','.tab-option',function(){
     if(!$(this).hasClass('active')){
         $('.tab-container').addClass('hidden');
         $('.tab-option').toggleClass('inactive active');
     $('.tab-container').eq($(this).index()).removeClass('hidden');

     }
 });

 $('.accordion .title').on('click',function(e){
  e.preventDefault();
  $(this).siblings('.body').slideToggle();
  $(this).toggleClass('collapse');
 });

 $(".view-solution, .hide-solution").click(function(){
  $(this).siblings(".solution").collapse('toggle');
  $(this).toggleClass("view-solution hide-solution");

 });

 $('.optionA.locked,.optionB.locked,.optionC.locked,.optionD.locked').click(function(){
    $(this).removeClass('locked');
 });


 selectOption = $(".optionA, .optionB, .optionC, .optionD").click(function(){
    if(testFinished == true)
       return;
    if($(this).hasClass("selected")){
      $(this).removeClass("selected");
      $($(this).closest(".container-question")[0]).children("input[name='gvnAnswer']").val("");      
      return;
    }
    //$.each($(this).parent().siblings(),function(){$(this).children("div").removeClass("selected");});
    test = $(this).closest("table");
    $.each($(this).closest("tbody").children(), function(){
       $.each( $(this).children() ,function(){$(this).removeClass("selected");})
    });


    $($(this).closest(".container-question")[0]).children("input[name='gvnAnswer']").val($(this).attr('class').substr(6,1));
    $(this).addClass("selected");
 });

 $(".test-finish").click(function(){finishTest();});

});

function finishTest(){
   $.each($("#test-container").children(".container-question"),function(){
    $.each($(this).children(".handle.hidden"), function(){
      $(this).toggleClass("hidden");
      $(this).children(".solution").addClass("collapse");
      $(this).children(".solution").removeClass("hidden");
});
   });
   $(".test-finish").addClass("hidden");
   testFinished = true;
   showScore();
   window.clearTimeout(testTimer);
   $("#test-timer").addClass("hidden");
   $('html, body').animate({scrollTop: $("#test-score").offset().top}, 500);

}

function startTest(type){
 for(var itr=0;itr<$('.question').length;itr++){$($(".question")[itr]).prepend("<b>Question "+(itr+1)+" </b>");}
 $("#test-controller").addClass("hidden");
 $("#test-container").removeClass("hidden");
 if(type == "timed"){
  $("#test-timer").toggleClass("hidden");
  $("#test-timer").html("<span>Time Left - </span><span>minutes</span><span>:</span><span>seconds</span>");
  initializeTimer();
 }
}


function showScore(){
 var content = "<table cellpadding='5' cellspacing='0' border='1' width='100%' class='table'><tr>";
 var answers = $(".answer");
 var gvnAnswers = $("input[name='gvnAnswer']");
 var score = 0;
 var correct = 0;
 var attempts = 0; 
 for(itr = 0; itr< answers.length; itr++){
  if($(answers[itr]).html().trim() == $(gvnAnswers[itr]).val().trim()){
    score++;attempts++;correct++;1
    $(answers[itr]).closest(".container-question").addClass("correct");
  }
  else if($(gvnAnswers[itr]).val().trim() != ""){
    attempts++;score-=0.5;
    $(answers[itr]).closest(".container-question").addClass("incorrect"); 
  }
  else{
   test = $(answers[itr]); 
   $(answers[itr]).closest(".container-question").addClass("unattempted");
  }
 }

 content += "<th>Score : </th><td>"+score+"</td>";
 content += "<th>Attempts : </th><td>"+attempts+"</td>";
 content += "<th>Correct : </th><td>"+correct+"</td>";
 content += "<th>Incorrect : </th><td>"+(attempts - correct)+"</td>";
 content += "</tr></table>";
 $("#test-score").html(content);
}
function initializeTimer()
{
  min=30;sec=0;timer();
}

function timer()
{
	if(--sec==-1){ sec=59;min--;
	 if(min==-1){min=59;}
	}
	
	if(sec<10)
          sec="0"+sec;
	if(min<10)
	  min="0"+ parseInt(min,10);
	if(min < 5){
           $("#test-timer").css({"background":"#FFE0E0", "border":"1px solid rgb(234, 198, 198)"});
        }
	if(min==0 && sec==0){					
	   alert(" *** Time Up *** \n Submitting Section ");
           finishTest();
	}else{					
	  $($("#test-timer").children()[1]).html(min);
          $($("#test-timer").children()[3]).html(sec);
	  testTimer = setTimeout("timer()",1000);	
	}
}
