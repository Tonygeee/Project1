/* KEYS THAT WE NEED FOR THE APIS
yelp: OOh_UrhHLZV11XrO0JYIM78p_s292XlDVJyjPea5fHknuURByqLe7UFo6MGt2KesAIltVL5vLonsq8j_UOLkjymV8maZsf_RZ37r

Foursquare: Client ID: ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI
            client secret: WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4

twitter key: TyTpv7pvNW8efyJ2xsCckhA3O

eventbrite: Key: V5EJ2TPSJGKB6YONZK
            Token: U5OPJ43N24OEA7SMURRR

Google API Key: AIzaSyCoFPgedX41Fv_7LEYXo1QRS8SL2cIjj3Y
*/
var placeSearch, autocomplete, city;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (document.getElementById("autocomplete")),
    { types: [] }
  );

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log("Autocomplete information: ");
  console.log(place);
  city = place.address_components[0].long_name;
  console.log("User entered: " + city);
  displayFoursquare2();
  displayEventbrite();
}

// function geolocate() {
//   autocomplete.setBounds(getBounds());
// }

// navigator.geolocation.getCurrentPosition(function(position) {
//   var geolocation = {
//     lat: position.coords.latitude,
//     lng: position.coords.longitude,
//   };
//   var circle = new google.maps.Circle({
//     center: geolocation,
//     radius: position.coords.accuracy,
//   });

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

function displayFoursquare2() {
  //city variable filled in "#submit-button on click"
  $("#foursquare").empty();
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=food&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=10";
  //ajax request to get name and id
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("foursquare object: ");
    console.log(response);
    for (var i = 0; i < response.response.groups[0].items.length; i++) {
      $("#foursquare").append(
        "<h1> " + response.response.groups[0].items[i].venue.name + "</h1>"
      );
      $("#foursquare").append(
        "<img class = 'food-img'src = " +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .prefix +
          "original" +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .suffix +
          ">"
      );
    }
  });
}
function displayEventbrite() {
  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
    city +
    "&token=BXIHDDMOSK4ACTSU43OP";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("Evenbrite object: ");
    console.log(response);
    $("#eventbrite").append(response.events[0].name.html);
    $("#eventbrite").append(response.events[0].description.html);
  });
}
