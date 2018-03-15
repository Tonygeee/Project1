//-------------------------------API KEYS----------------------------------
/*Foursquare: Client ID: ZWTX3M0CQF4A34CXDBMUFHB1I4SDJV5CYRIJ3B1HQWNJZQKI
            client secret: WDJWVSV5OOXGZH5UU1D5Z4TCNTF3FFNJVQSN3ABBS25243K4

eventbrite: Key: V5EJ2TPSJGKB6YONZK
            Token: U5OPJ43N24OEA7SMURRR

Google API Key: AIzaSyCoFPgedX41Fv_7LEYXo1QRS8SL2cIjj3Y
*/

//---------------------call all functions, onclick-----------------------------
$( "#foodButton" ).click(function() {
  $( "#foodDiv" ).empty();
 displayFoursquareFood();
});

 $( "#coffeeButton" ).click(function() {
  $( "#coffeeDiv" ).empty();
  displayFoursquareCoffee();
 });

 $( "#weatherButton" ).click(function() {
  $( "#weatherDiv" ).empty();
  weather();
 });

 $( "#jobButton" ).click(function() {
  $( "#jobDiv" ).empty();
  displayEventbriteJobs();
 });

 $( "#musicButton" ).click(function() {
  $( "#musicDiv" ).empty();
  displayEventbriteMusic();
 });



//-----------------------------Global Variable-----------------------------------

var city = sessionStorage.getItem("userInput");

$("#cityName").append(city);

//--------------------------------functions-------------------------------------

function displayFoursquareFood() {
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=food&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=5";
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
      $("#foodDiv").css("background-color", "white");
      $("#foodDiv").css("width", "50%");
      $("#foodDiv").css("margin-left", "auto");
      $("#foodDiv").css("margin-right", "auto");
      var foodResults = $("<div>");
      foodResults.append(
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
      foodResults.append(
        "<h1 class='heading'><a target ='blank' href= " +
          link +
          ">" +
          response.response.groups[0].items[i].venue.name +
          "</a></h1>"
      );
      $("#foodDiv").append(foodResults);
    }
  });
}

function displayFoursquareCoffee() {
  var queryURL =
    "https://api.foursquare.com/v2/venues/explore?near=" +
    city +
    "&section=coffee&venuePhotos=1&m=foursquare&oauth_token=XA4FOIKVQSHXMH32T3J2BKV0EQKYL5EZZYXYF4P3ATQYD2SN&v=20180308&limit=5";
  //ajax request to get name and id
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("foursquare COFFEE object: ");
    console.log(response);
    var link = "";
    $("#coffeeDiv").append(link);
    for (var i = 0; i < response.response.groups[0].items.length; i++) {
      link = response.response.groups[0].items[i].tips[0].canonicalUrl;
      var coffeeResults = $("<div>");
      $("#coffeeDiv").css("background-color", "white");
      $("#coffeeDiv").css("width", "50%" );
      $("#coffeeDiv").css("margin-left", "auto");
      $("#coffeeDiv").css("margin-right", "auto");
      $("#coffeeDiv").append(
        "<a target = 'blank' href = " +
          link +
          "><img class = 'coffee-img'src = " +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .prefix +
          "original" +
          response.response.groups[0].items[i].venue.photos.groups[0].items[0]
            .suffix +
          "></a>"
      );
      $("#coffeeDiv").append(
        "<h1 class='heading'><a target ='blank' href= " +
          link +
          ">" +
          response.response.groups[0].items[i].venue.name +
          "</a></h1>"
      );

    }
  });
}
function displayEventbriteMusic() {
  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
    city +
    "&sort_by=best&categories=103&token=BXIHDDMOSK4ACTSU43OP";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("Evenbrite object: ");
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var link = response.events[i].url;
      if (response.events[i].logo.url !== 0) {
        $("#musicDiv").css("background-color", "white");
        $("#musicDiv").css("width", "50%");
        $("#musicDiv").css("margin-left", "auto");
        $("#musicDiv").css("margin-right", "auto");
        var musicResults = $("<div>");
        $("#musicDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><img class='music-img' src= " +
            response.events[i].logo.url +
            "></a>"
        );
        $("#musicDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><h1 class='heading'>" +
            response.events[i].name.text +
            "</h1></a>"
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
    $("#weatherDiv").css("background-color", "white");
    $("#weatherDiv").css("width", "80%");
    $("#weatherDiv").css("margin-left", "auto");
    $("#weatherDiv").css("margin-right", "auto");
    $("#weatherDiv").css("padding", "20px");
    $("#weatherDiv").css("color", "grey");
    $("#weatherDiv").css("font-size", "15px");
    $("#weatherDiv").html(
        " Max Current Temp in this city: " +
        response.main.temp_max +
        "<br><br>" +
        " Min Current Temp in this city: " +
        response.main.temp_min +
        "<br>"
    );
  });
}
function displayEventbriteJobs() {
  var queryURL =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
    city +
    "&sort_by=best&categories=101&token=BXIHDDMOSK4ACTSU43OP";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log("Evenbrite object: ");
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var link = response.events[i].url;
      if (response.events[i].logo.url !== 0) {
        $("#jobDiv").css("background-color", "white");
        $("#jobDiv").css("width", "50%");
        $("#jobDiv").css("margin-left", "auto");
        $("#jobDiv").css("margin-right", "auto");
        $("#jobDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><img class='job-img' src= " +
            response.events[i].logo.url +
            "></a>"
        );
        $("#jobDiv").append(
          "<a target = 'blank' href = " +
            link +
            "><h1 class='heading'>" +
            response.events[i].name.text +
            "</h1></a>"
        );  
      }
    }
  });
}

//input housing function 


//----------------------Initialize firebase, all firebase usage------------------------
var config = {
  apiKey: "AIzaSyDq0f3RJAgCPuS9R_PjfGWJQ57Xzx9sVso",
  authDomain: "project1-1520313005698.firebaseapp.com",
  databaseURL: "https://project1-1520313005698.firebaseio.com",
  projectId: "project1-1520313005698",
  storageBucket: "project1-1520313005698.appspot.com",
  messagingSenderId: "1065047897826"
};

firebase.initializeApp(config);

var database = firebase.database();

var coffeeCounter = 0;
var foodCounter = 0;
var musicCounter = 0;
var jobCounter = 0;
var weatherCounter = 0;
var housingCounter = 0;


$("#coffeeButton").on("click", function() {
  coffeeCounter++;
  database.ref().push({
    coffee: coffeeCounter,
    food: foodCounter,
    music: musicCounter,
    job: jobCounter,
    weather: weatherCounter,
    housing: housingCounter });
});

$("#foodButton").on("click", function() {
foodCounter++;
database.ref().push({
  coffee: coffeeCounter,
  food: foodCounter,
  music: musicCounter,
  job: jobCounter,
  weather: weatherCounter,
  housing: housingCounter });
});

$("#musicButton").on("click", function() {
  musicCounter++;
  database.ref().push({
    coffee: coffeeCounter,
    food: foodCounter,
    music: musicCounter,
    job: jobCounter,
    weather: weatherCounter,
    housing: housingCounter  });
  });
  
$("#jobButton").on("click", function() {
  jobCounter++;
  database.ref().push({
    coffee: coffeeCounter,
    food: foodCounter,
    music: musicCounter,
    job: jobCounter,
    weather: weatherCounter,
    housing: housingCounter  });
  });

$("#weatherButton").on("click", function() {
  weatherCounter++;
  database.ref().push({
    coffee: coffeeCounter,
    food: foodCounter,
    music: musicCounter,
    job: jobCounter,
    weather: weatherCounter,
    housing: housingCounter  });
  });

  $("#housingButton").on("click", function() {
    housingCounter++;
    database.ref().push({
      coffee: coffeeCounter,
      food: foodCounter,
      music: musicCounter,
      job: jobCounter,
      weather: weatherCounter,
      housing: housingCounter  });
    });

