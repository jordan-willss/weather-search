const apiKey = "a746c39b544add03fe90171ae5eb8185";

function init() {
	// Get the elements and save them to variables
  let input = document.getElementById("weather-input");
  let display = document.getElementById("weather-display");

	// Add an event listener to the input that calls whenever it's changed
  input.addEventListener("change", () => {
		// Save the endpoint to a variable (this is a promise)
		let res = getWeather(apiKey, input.value);
		
		// Return the response from the promise
		res.then(obj => {
			let divider = " - ";
			let location = obj?.name;
			let weather = "Weather: " + obj?.weather[0]?.main;
			let temperature = "Temp: " + Math.floor(obj?.main?.temp - 275) + " celsius";

			// Set the content of the display element
			display.innerText = location + divider + temperature + divider + weather;
		});
  });
}

async function getWeather(apiKey, location) {
	// Get the information from the endpoint
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  ).then(response => {
		// Turn the response into a JSON promise
		return response.json();
	}).then(data => {
		// Return the response out of the promise
		return data;
	})

	// Return the reponse from the method
  return res;
}

window.addEventListener("load", () => {
  // Run on load
  init();
});
