const endPoint = "weather";
const address = document.querySelector("input");
const area = document.querySelector("#location");
const weatherCondition = document.querySelector("#weatherCondition");
const temp = document.querySelector("#temp");
const feelslike = document.querySelector("#feelslike");
const humidity = document.querySelector("#humidity");
const error = document.querySelector("#error");

const weatherFrom = document.querySelector("form");
const weather = (address) => {
  // Display loading text
  area.textContent = "Loading...";

  fetch(`${endPoint}?location=${address}`).then((res) => {
    res
      .json()
      .then((data) => {
        if (data.error) {
          error.textContent = `Error: ${data.error}`;
        } else {
          console.log(data);
          area.textContent = `Address: ${data.location}`;
          weatherCondition.textContent = `The weather Condition is ${data.weatherCondition}`;
          temp.textContent = `Actual Temperature is ${data.temp}`;
          feelslike.textContent = `But Temperature feels like ${data.feelslike}`;
          humidity.textContent = `The humidity is ${data.humidity}`;
        }
      })
      .catch(() => {
        error.textContent = "Failed to fetch data.";
      });
  });
};

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!address.value) {
    error.textContent = "You must provide an address";
  } else {
    weather(address.value);
  }
});
