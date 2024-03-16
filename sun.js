//Fetch from sunrise sunset API for todays times

const latitude = -37.7673;
const longitude = 144.9802;
const sunUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
import fetch from "node-fetch";


const sunTimePromise = fetch(sunUrl)
  .then((response) => response.json())
  .then((data) => {
    return {
      sunrise: data.results.sunrise,
      sunset: data.results.sunset,
    };
  })
  .catch((error) => console.error("Error:", error));

  sunTimePromise
  .then((sunTimeData) => {
    // console.log("Sunrise time:", sunTimeData.sunrise);
    // console.log("Sunset time:", sunTimeData.sunset);
  })
  .catch((error) => {
    console.error("Error fetching sunrise and sunset data:", error);
  });

export {sunTimePromise};
