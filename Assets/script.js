



// Retrieves search history from local storage
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Function to add a city to the search history
function addCityToHistory(cityName) {
  searchHistory.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  console.log(localStorage)
  };

  

// Function to clear the search history
function clearSearchHistory(event) {
  event.preventDefault();
  searchHistory = [];
  localStorage.removeItem("searchHistory");
  var cityList = document.getElementById("cityList");
  cityList.innerHTML = "";
};

// Function to handle the search action
function searchCity(event) {
  event.preventDefault();
  var input = document.getElementById("cityInput");
  var cityName = input.value.trim();

  if (cityName) {
    // Performs the search here. //

    searchAPI(cityName);
    // Adds the city to the search history. //
    addCityToHistory(cityName);

    // Clears the input field after a search is conducted. //
    input.value = "";
    };
  };


// The concatenation below makes it so you can search by city instead of by coordinates and displays Fahrenheit (imperial temp). //
function searchAPI(cityName) {
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=40e8f4e7cce1a052fa34799e8403ed4a&units=imperial"

    // Json method on the response. //
  fetch(url).then(function(response){
    return response.json() 

  })
    .then(function(data){
      //Sets a variable that clears the data when called below. //
      clearWeatherData()
    
      // This for loop makes it possible to iterate over and print data from the Open Weather API. Due to the standard 5-day Forecast being unavailable for free I used math logic to make the 5-day 3-hour forecast work instead. This means the forecast displays the future outside the paywall. //
      console.log(data)
      $(".grid-item").each(function(i, el) {
        var $el = $(el);
        var label

      
        var $currentCity = $("<div/>");
        $currentCity.addClass("forecast-city");
        $currentCity.text("City: "+data.city.name);
        $currentCity.appendTo($el);

        var $currentDateTime = $("<div/>");
        $currentDateTime.addClass("forecast-date");
        $currentDateTime.text("Date/Time: "+data.list [2+(i*8)].dt_txt);
        $currentDateTime.appendTo($el);
       
        //Creates an image class, instead of a div google fonts, converts conditions to google.//
        var $icon = $("<img/>");
        $icon.addClass("forecast-icon");
        $icon.attr("src", "http://openweathermap.org/img/w/" + data.list[2+(i*8)].weather[0].icon + ".png");
        $icon.appendTo($el);
      
        var $temp = $("<div/>");
        $temp.addClass("forecast-temp");
        $temp.text("Temp: "+data.list[2+(i*8)].main.temp+"F");
        $temp.appendTo($el);
      
        var $humid = $("<div/>");
        $humid.addClass("forecast-humidity");
        $humid.text("Humidity: "+data.list[2+(i*8)].main.humidity+"%");
        $humid.appendTo($el);
      
        var $wind = $("<div/>");
        $wind.addClass("forecast-wind");
        $wind.text("Wind: "+data.list[2+(i*8)].wind.speed+"mph");
        $wind.appendTo($el);
      
      });
    });
  }
// debugger; // **Remove when done with this.** //
  

// Loads the search history onto the page - could not figure out how to make this happen after clicking "search". //
window.addEventListener("DOMContentLoaded", function () {
  var cityList = document.getElementById("cityList");

  searchHistory.forEach(function (city) {
    var listItem = document.createElement("li");
    listItem.textContent = city;
    cityList.appendChild(listItem);

  // Adds click event listener to each list item. //
  listItem.addEventListener("click", function () {
    // Retrieve the city name from the clicked list item
    var cityName = this.textContent;

    // Calls the searchAPI function with the clicked city name. //
    searchAPI(cityName);
  });  
  });
});

// Attaches event listeners to the search button and clear search button. //
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function(event) { searchCity(event); });

var clearSearchButton = document.getElementById("clearSearchButton");
clearSearchButton.addEventListener("click", function(event) { clearSearchHistory(event) });


// This function calls the "clear weather data" for each data item in the for loop beginning on line 59. //
function clearWeatherData () {
  $("div.forecast-city").remove();
  $("div.forecast-date").remove();
  $("img.forecast-icon").remove();
  $("div.forecast-temp").remove();
  $("div.forecast-humidity").remove();
  $("div.forecast-wind").remove();
};


///////////////////////////////////////////////////////////////////


