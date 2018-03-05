// yelp key OOh_UrhHLZV11XrO0JYIM78p_s292XlDVJyjPea5fHknuURByqLe7UFo6MGt2KesAIltVL5vLonsq8j_UOLkjymV8maZsf_RZ37r

// Foursquare ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI

// Foursquare client secret: WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4

// twitter key: TyTpv7pvNW8efyJ2xsCckhA3O

// https://api.foursquare.com/v2/venues/search?near=seattle,wa&query=coffee&v=20150214&m=foursquare&client_secret=WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4&client_id=ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI
function displayFoursquare() {
  var city = "sacramento"; //change later to what user inputs EX: ".val()"
  //giphyAPI
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
    // $("#foursquare").append(
    //   "<img src='" +
    //     response.response.venues[1].categories[0].icon.prefix +
    //     response.response.venues[1].categories[0].icon.suffix +
    //     "'>"
    // );
  });
}

function displayTwitter() {
  var city = "sacramento"; //change later to what user inputs EX: ".val()"
}

// function displayPic() {
//   var venueID = response.response.venues[1].id;
//   //giphyAPI
//   var queryURL =
//     "https://api.foursquare.com/v2/venues/" +
//     venueID +
//     "/photos&m=foursquare&client_secret=WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4&client_id=ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI&limit=10";

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function(response2) {
//     console.log(response2);
//     // $("#foursquare").append(response.response.venues[1]);
//   });
// }
displayFoursquare();
