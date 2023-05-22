// Retrieve search history from local storage
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Function to add a city to the search history
function addCityToHistory(cityName) {
  searchHistory.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Function to clear the search history
function clearSearchHistory() {
  searchHistory = [];
  localStorage.removeItem("searchHistory");
  var cityList = document.getElementById("cityList");
  cityList.innerHTML = "";
}

// Function to handle the search action
function searchCity() {
  var input = document.getElementById("cityInput");
  var cityName = input.value.trim();

  if (cityName) {
    // Perform the search here
    // ...

    // Add the city to the search history
    addCityToHistory(cityName);

    // Clear the input field
    input.value = "";
  }
}

// Loads the search history onto the page
window.addEventListener("DOMContentLoaded", function () {
  var cityList = document.getElementById("cityList");

  searchHistory.forEach(function (city) {
    var listItem = document.createElement("li");
    listItem.textContent = city;
    cityList.appendChild(listItem);
  });
});

// Attach event listeners to the search button and clear search button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchCity);

var clearSearchButton = document.getElementById("clearSearchButton");
clearSearchButton.addEventListener("click", clearSearchHistory);

///////////////////////////////////////////////////////////////////

//city and date with local forecast//




// The five-day forcast shows for the 5 days following the current date. //
