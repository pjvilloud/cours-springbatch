var $ = jQuery.noConflict();

var searchInput;
var $content = $("#impress");
var $results;
var currentIndex = 0;

function search(){
  if(searchInput !== $("#searchInput").val()){
    currentIndex = -1;
    searchInput = $("#searchInput").val();
  }
  currentIndex++;
  if($results && $results.length){
    for(i=0;i<$results.length;i++){
      $($results[i]).removeClass("font-weight-bold bg-primary");
    };
  }
  $content.unmark({
      done: function() {
        $content.mark(searchInput, {
          separateWordSearch: true,
          done: function() {
            $results = $content.find("mark");
            jumpTo();
          }
        });
      }
    });
}

function jumpTo() {
  if ($results && $results.length) {
    $("#searchInput").addClass("is-valid");
    $("#searchNb").removeClass("text-danger");
    $("#searchNb").addClass("text-success");
    $("#searchInput").removeClass("is-invalid");
    $("#searchNb").html((currentIndex + 1) + "/" + $results.length)
    $current = $results.eq(currentIndex);
    if ($current.length) {
      $($current).addClass("font-weight-bold bg-primary");
      //Go to step
      imp.goto($($current).closest(".step.slide").attr("id"));
    }
    if ($results.length === currentIndex + 1) {
      currentIndex = -1;
    }
  } else {
    $content.unmark();
    $("#searchNb").html("0 résultat");
    $("#searchNb").removeClass("text-success");
    $("#searchNb").addClass("text-danger");
    $("#searchInput").removeClass("is-valid");
    $("#searchInput").addClass("is-invalid");
  }
}
