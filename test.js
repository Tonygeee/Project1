/* KEYS THAT WE NEED FOR THE APIS
yelp: OOh_UrhHLZV11XrO0JYIM78p_s292XlDVJyjPea5fHknuURByqLe7UFo6MGt2KesAIltVL5vLonsq8j_UOLkjymV8maZsf_RZ37r

Foursquare: Client ID: ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI
            client secret: WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4

twitter key: TyTpv7pvNW8efyJ2xsCckhA3O

eventbrite: Key: V5EJ2TPSJGKB6YONZK
            Token: U5OPJ43N24OEA7SMURRR
*/
var city = ""; //filled with user input

$("#submit-button").on("click", function(event) {
  event.preventDefault();
  //grabbing value of users input
  city = $("#city-input")
    .val()
    .trim();
  console.log("User entered: " + city);
  //Call Functions that will display information
  displayFoursquare();
});

//declare global var for venueName
var venueName = "";

function displayFoursquare() {
  //city variable filled in "#submit-button on click"

  var queryURL =
    "https://api.foursquare.com/v2/venues/search?near=" +
    city +
    "&query=restaurant&v=20150214&m=foursquare&client_secret=WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4&client_id=ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response.response.venues);
    var venues = response.response.venues;
    for (var i = 0; i < venues.length; i++) {
      $("#foursquare").append(
        "<p>" + response.response.venues[i].name + "</p>"
      );
      var venueID = response.response.venues[i].id;
      console.log("VENUE ID " + venueID);
      var ImgURL =
        "https://api.foursquare.com/v2/venues/" +
        venueID +
        "/photos?&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180306";
      $.ajax({
        url: ImgURL,
        method: "GET",
      }).then(function(image) {
        console.log(image.response);
        if (image.response.photos.items.length !== 0) {
          $("#foursquare").append(
            "<img src=" +
              image.response.photos.items[0].prefix +
              "300x500" +
              image.response.photos.items[0].suffix +
              ">"
          );
        }
      });
    }
  });
}
