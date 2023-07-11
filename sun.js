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

 // const sunTimeValue = sunTimePromise;
  //  console.log(sunTimeValue.sunrise)
  //  console.log(sunTimeValue.sunset)
    
export {sunTimePromise};
