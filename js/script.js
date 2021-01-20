var $ = jQuery.noConflict();
var currentStep = null;
var previousStep = null;

$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
    $(block).find('[data-toggle="popover"]').popover({
      container: 'body',
      boundary: 'window'
    });
  });
});
var nbSlides = $(".step.slide").length;
var showPopover = new URL(window.location).searchParams.get("showPopover");

var rootElement = document.getElementById( "impress" );

rootElement.addEventListener( "impress:stepenter", function(event) {
  currentStep = event.target;
  if(!$(currentStep).hasClass("show")) {
    $("#" + currentStep.id).addClass("show")
  }


  if(showPopover === "true") {
    setTimeout(function(){
      $('#' + currentStep.id + ' [data-toggle="popover"]').popover('show', {
        container: 'body',
        boundary: 'window'
      });
  }, 1000);
  } else {
    $('#' + currentStep.id + ' [data-toggle="popover"]').popover({
      container: 'body',
      boundary: 'window'
    });
  }
  if(previousStep != null)
  {
    $("#" + previousStep.id).removeClass("show")
  }



});

rootElement.addEventListener( "impress:stepleave", function(event) {
  $("#" + event.detail.next.id).addClass("show");
  previousStep = event.target;
  $('#' + previousStep.id + ' [data-toggle="popover"]').popover('dispose');
  var numeroSlide = $(event.detail.next).attr("data-nb");
  $("#numSlide").html(numeroSlide);
  var percentageSlide = Math.round(numeroSlide * 100 / nbSlides);
  $("#progress").attr("style", "width: " + percentageSlide + "%;");
  $("#progress").attr("aria-valuenow", percentageSlide);
});

$(window).on('hashchange', function(e){
    //Gérer dropdown-toggle
    var origEvent = e.originalEvent;
    oldHash = origEvent.oldURL.substring(origEvent.oldURL.lastIndexOf("#")).replace("/","");
    newHash = origEvent.newURL.substring(origEvent.newURL.lastIndexOf("#")).replace("/","");
    $('#my-navbar li a').removeClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.indexOf("-")) + '"]').addClass("active");
    urls = newHash.split("-");
    if(urls.length > 3){
      $('#my-navbar li a[href="' + urls[0] + "-" + urls[1] + '"]').addClass("active");
    } else {
      $('#my-navbar li a[href="' + newHash.substring(0,newHash.lastIndexOf("-")) + '"]').addClass("active");
    }
    $('#my-navbar li a[href="' + newHash + '"]').addClass("active");
    
});

//-------------------

$("div.step.slide").each(function(index, el) {
  var id = $(el).attr("id");
  var title = $(el).find("h1.display-3").text();
  $(el).attr("data-nb", index + 1);
  var yOffset = 1100;
  var xOffset = 2000;
  var ybase = 1100;
  var xbase = 0; 
  if(id !== 'accueil'){
    if(id.indexOf("-") > 0){
      var baseId = id.substring(0,id.indexOf("-"));
      var baseWithoutEndId = id.substring(0,id.lastIndexOf("-"));

      if(id.lastIndexOf("-") !== id.indexOf("-")){
        if(id.split("-").length === 4){
          $(el).attr("data-rel-x", xOffset);
          $(el).attr("data-rel-y", 0);
          $(el).attr("data-rotate-x", 90);
          $(el).attr("data-z", -2000);
        } else {
          $(el).attr("data-rel-x", 0);
          $(el).attr("data-rel-y", 0);
          $(el).attr("data-z", -2000);
          $(el).attr("data-rotate-x", 90);
        }
        baseList = $("#li-"+baseWithoutEndId+">ul");
        // if (!$(baseList).length){
        //   $("div#dropdown-"+baseId).
        // }
        // $(baseList).append('<li><a class="dropdown-item" href="#'+id+'">'+title+'</a></li>');
      } else {
        $("div#dropdown-"+baseId).append('<a class="dropdown-item" id="link-'+id+'" href="#'+id+'">'+title+'</a>');
        $(el).attr("data-rel-x", xOffset);
        $(el).attr("data-rel-y", 0);
        $(el).attr("data-z", 0);
      }
    } else {
      if($('div[id^="'+id+'-"]').length > 0){
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item dropdown" id="li-'+id+'"> <a class="nav-link dropdown-toggle" id="navbarDropdown'+id+'" href="#'+id+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+title+'</a> <div id="dropdown-'+id+'" class="dropdown-menu" aria-labelledby="navbarDropdown'+id+'"></div></li>');
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
        $(el).attr("data-z", 0);
      } else {
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item" id="li-'+id+'"><a class="nav-link" href="#'+id+'">'+title+'</a></li>');
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
        $(el).attr("data-z", 0);
      }
    }
  }
});

var imp = impress();
imp.init();