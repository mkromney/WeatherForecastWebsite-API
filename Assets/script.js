



// Retrieves search history from local storage
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Function to add a city to the search history
function addCityToHistory(cityName) {
  searchHistory.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
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
    // Add the city to the search history
    addCityToHistory(cityName);

    // Clear the input field
    input.value = "";
    };
  };


// The concatenation below makes it so you can search any city. //
function searchAPI(cityName) {
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=40e8f4e7cce1a052fa34799e8403ed4a&units=imperial"

  // Might 'get' be better here? //
  fetch(url).then(function(response){
    return response.json() // json method on the response //

  })
    .then(function(data){
      //clear the data  here //
      clearWeatherData()
    

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
        $currentDateTime.text("Date: "+data.list [2+(i*8)].dt_txt);
        $currentDateTime.appendTo($el);
       
        //create an image class, instead of a div google fonts, converts conditions to google.//
        var $icon = $("<div/>");
        $icon.addClass("forecast-icon");
        $icon.text(data.list[2+(i*8)].weather[0].icon);
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
// debugger; // **Remove when done with this** //
  

// Loads the search history onto the page
window.addEventListener("DOMContentLoaded", function () {
  var cityList = document.getElementById("cityList");

  searchHistory.forEach(function (city) {
    var listItem = document.createElement("li");
    listItem.textContent = city;
    cityList.appendChild(listItem);

  // Add click event listener to each list item
  listItem.addEventListener("click", function () {
    // Retrieve the city name from the clicked list item
    var cityName = this.textContent;

    // Call the searchAPI function with the clicked city name
    searchAPI(cityName);
  });  
  });
});

// Attach event listeners to the search button and clear search button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function(event) { searchCity(event); });

var clearSearchButton = document.getElementById("clearSearchButton");
clearSearchButton.addEventListener("click", function(event) { clearSearchHistory(event) });



function clearWeatherData () {
  $("div.forecast-city").remove();
  $("div.forecast-date").remove();
  $("div.forecast-icon").remove();
  $("div.forecast-temp").remove();
  $("div.forecast-humidity").remove();
  $("div.forecast-wind").remove();
};


///////////////////////////////////////////////////////////////////


