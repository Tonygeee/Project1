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
  //Call Function/s that will display information
  displayFoursquare();
});

//declare global var for venueName
var venueName = "";

function displayFoursquare() {
  //city variable filled in "#submit-button on click"
  $("#foursquare").empty();
  var queryURL =
    "https://api.foursquare.com/v2/venues/search?near=" +
    city +
    "&query=restaurant&v=20150214&m=foursquare&client_secret=WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4&client_id=ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI&limit=10";
  //ajax request to get name and id
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response.response.venues);
    var venues = response.response.venues;
    for (var i = 0; i < venues.length; i++) {
      console.log(response.response.venues[i].name);
      var venueID = response.response.venues[i].id;
      var VENUENAME = response.response.venues[i].name;
      console.log("VENUE ID " + venueID);
      getVenueImg(VENUENAME, venueID); //here we call the getVenueImg function and pass it two arguements: name and id (which are local scope to the first function)
    }
  });
}

function getVenueImg(name, id) {
  //pass this function 2 arguements
  var ImgURL =
    "https://api.foursquare.com/v2/venues/" +
    id +
    "/photos?&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180306";
  $.ajax({
    url: ImgURL,
    method: "GET",
  }).then(function(image) {
    console.log(image.response);
    if (image.response.photos.items.length !== 0) {
      //only display name/img if there is an image in the array
      var imgDiv = $("<div>"); //create a div to keep the pair of name+img in each one
      imgDiv.addClass("imgDiv"); //give it a class for styling later
      var p = $("<p>").text(name);
      var venueImg = $("<img>");
      venueImg.attr(
        "src",
        image.response.photos.items[0].prefix +
          "100x100" +
          image.response.photos.items[0].suffix
      );
      venueImg.addClass("venueImg");
      imgDiv.append(p);
      imgDiv.append(venueImg);
      $("#foursquare").prepend(imgDiv); //apend it to our foursquare div in html
    }
  });
}
