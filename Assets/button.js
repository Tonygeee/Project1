$(document).ready(function() {
  $("#b1").click(function() {
    // $("#card1").width(200);
    var buttonCard = $(this)
      .parent()
      .parent()
      .parent();
    var otherCards = $(this)
      .parent()
      .parent()
      .parent()
      .siblings();
    buttonCard
      .removeClass("col-sm-4")
      .addClass("col-sm-6")
      .css({
        width: "100%",
        "max-width": "100%",
      });
    otherCards.removeClass("col-sm-4").addClass("col-sm-3");
  });
});
