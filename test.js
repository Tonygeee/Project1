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
  //   displayYelp();
});

function displayFoursquare() {
  //city variable filled in "#submit-button on click"

  var queryURL =
    "https://api.foursquare.com/v2/venues/search?near=" +
    city +
    "&query=coffee&v=20150214&m=foursquare&client_secret=WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4&client_id=ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response.response.venues);
    $("#foursquare").append(response.response.venues[0].name);
    /* To append the image. NOTE: doesn't currently work. Says We dont have access.
    $("#foursquare").append(
      "<img src='" +
        response.response.venues[1].categories[0].icon.prefix +
        response.response.venues[1].categories[0].icon.suffix +
        "'>"
    );
    */
  });
}
function displayYelp() {
  //TEST url for something to searching for. This will be changed later with user input
  var URL =
    "https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=40.82783908257346&longitude=-74.10162448883057&client_id=LrOQ1nnyQzNiJYbVBjqJMg";

  $.ajax({
    url: URL,
    method: "GET",
    //headers: is to authenticate who we are instead of &API_KEY in the url above, Headers Authorization is used.
    headers: {
      Authorization:
        "Bearer OOh_UrhHLZV11XrO0JYIM78p_s292XlDVJyjPea5fHknuURByqLe7UFo6MGt2KesAIltVL5vLonsq8j_UOLkjymV8maZsf_RZ37r",
    },
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.error(err);
    });
}
