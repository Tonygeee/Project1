/* KEYS THAT WE NEED FOR THE APIS
yelp: OOh_UrhHLZV11XrO0JYIM78p_s292XlDVJyjPea5fHknuURByqLe7UFo6MGt2KesAIltVL5vLonsq8j_UOLkjymV8maZsf_RZ37r

Foursquare: Client ID: ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI
            client secret: WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4

twitter key: TyTpv7pvNW8efyJ2xsCckhA3O

eventbrite: Key: V5EJ2TPSJGKB6YONZK
            Token: U5OPJ43N24OEA7SMURRR

Google API Key: AIzaSyCoFPgedX41Fv_7LEYXo1QRS8SL2cIjj3Y
*/


// $("#submit-button").on("click", function(event) {
//   event.preventDefault();
//   //grabbing value of users input
//   city = $("#city-input")
//     .val()
//     .trim();
//   console.log("User entered: " + city);
//   //Call Function/s that will display information
//   displayFoursquare();
// });

// $("#foodButton").on("click", displayFoursquareFood);
$( "#foodButton" ).click(function() {
 displayFoursquareFood();
});

var city = sessionStorage.getItem("userInput");

function displayFoursquareFood() {
  // $("#foodDiv").empty();
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=food&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("foursquare FOOD object: ");
    console.log(response);
    var link = "";
    $("#foodDiv").append(link);
    for (var i = 0; i < response.response.groups[0].items.length; i++) {
      link = response.response.groups[0].items[i].tips[0].canonicalUrl;
      $("#foodDiv").append(
        "<h1 class='heading'><a target ='blank' href= " +
          link +
          ">" +
          response.response.groups[0].items[i].venue.name +
          "</a></h1>"
      );
      $("#foodDiv").append(
        "<a target = 'blank' href = " +
          link +
          "><img class = 'food-img' src = " +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .prefix +
          "original" +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .suffix +
          "></a>"
      );
    }
  });
}

function displayFoursquareCoffee() {
  //city variable filled in "#submit-button on click"
  $("#foursquare").empty();
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=coffee&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=10";
  //ajax request to get name and id
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("foursquare COFFEE object: ");
    console.log(response);
    var link = "";
    $("#foursquare").append(link);
    for (var i = 0; i < response.response.groups[0].items.length; i++) {
      link = response.response.groups[0].items[i].tips[0].canonicalUrl;
      $("#foursquare").append(
        "<h1><a target ='blank' href= " +
          link +
          ">" +
          response.response.groups[0].items[i].venue.name +
          "</a></h1>"
      );
      $("#foursquare").append(
        "<a target = 'blank' href = " +
          link +
          "><img class = 'food-img'src = " +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .prefix +
          "original" +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .suffix +
          "></a>"
      );
    }
  });
}
function displayEventbriteMusic() {
  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
    city +
    "&sort_by=best&categories=103&token=BXIHDDMOSK4ACTSU43OP";

  //codes: 101 is job fairs, 103 is concerts
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("Evenbrite object: ");
    console.log(response);
    for (var i = 0; i < 10; i++) {
      var link = response.events[i].url;
      if (response.events[i].logo.url !== 0) {
        $("#eventbrite").append(
          "<a target = 'blank' href = " +
            link +
            "><h1>" +
            response.events[i].name.text +
            "</h1></a>"
        );
        // $("#eventbrite").append(response.events[0].description.text);
        $("#eventbrite").append(
          "<a target = 'blank' href = " +
            link +
            "><img src= " +
            response.events[i].logo.url +
            "></a>"
        );
      }
    }
  });
}
function weather() {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      city +
      "&units=imperial&appid=9d09809a4b038ee946dc9c53ea322c14",
    method: "GET",
  }).then(function(response) {
    console.log(response);
    console.log("Name: " + response.name);
    console.log("Max Current Temp in this city: " + response.main.temp_max);
    console.log("Min Current Temp in this city: " + response.main.temp_min);
    $("#weather").append(
      response.name +
        "<br>" +
        " Max Current Temp in this city: " +
        response.main.temp_max +
        "<br>" +
        " Min Current Temp in this city: " +
        response.main.temp_min +
        "<br>"
    );
  });
}