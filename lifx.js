import axios from "axios";
import { headers } from "./config.js";
import { sunTimePromise } from "./sun.js";

// Sunrise function NO LOGNER IN USE
// const sunrise = async () => {
//   const sunriseChange = {
//     method: "PUT",
//     url: "https://api.lifx.com/v1/lights/id:d073d56e2210,id:d073d529bc2f,id:d073d5432b28/state",
//     headers: headers,
//     data: {
//       duration: 1,
//       fast: false,
//       color: "hue:26.54 saturation:0.695 kelvin:3500",
//       brightness: 0.4,
//       power: "on",
//     },
//   };

//   try {
//     const response = await axios(sunriseChange);
//     //console.log(response.data);
//   } catch (error) {
//     console.error("An error occurred with sunrise function:", error);
//   }
// };

// Wake function
const wake = async () => {
  const wakeChange = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/id:d073d56b5191/state",
    headers: headers,
    data: {
      duration: 1,
      fast: false,
      color: "hue:26.54 saturation:0.695 kelvin:3500",
      brightness: 0.4,
      power: "on",
    },
  };

  try {
    const response = await axios(wakeChange);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with wake function:", error);
  }
};

//Work function
const work = async () => {
  const offExceptOffice = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/id:d073d56b5191/state",
    headers: headers,
    data: {
      power: "off",
    },
  };
  const changeOffice = {
    method: "PUT",
    url: "https://api.lifx.com/v1/scenes/scene_id:8dc00e56-c5b2-4290-91e6-c3c2e48d02aa/activate",
    headers: headers,
    data: {
      duration: 1,
      fast: false,
    },
  };
  try {
    const response = await axios(offExceptOffice);
    //console.log(response.data);
  } catch (error) {
    console.error(
      "An error occurred when turning off all lights for work function:",
      error
    );
  }
  try {
    const response = await axios(changeOffice);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred when turning on office scene:", error);
  }
};

//Sunset function
const sunset = async () => {
  const sunsetChange = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/id:d073d56b5191,id:d073d56e2210/state",
    headers: headers,
    data: {
      duration: 1,
      fast: false,
      color: "#F39C12",
      brightness: 0.4,
      power: "on",
    }
  };
  const changeOfficeSunset = {
    method: "PUT",
    url: "https://api.lifx.com/v1/scenes/scene_id:99718963-31ae-4468-bb08-9bc40e36d33f/activate",
    headers: headers,
    data: {
      duration: 1,
      fast: false,
    },
  };
  try {
    const response = await axios(sunsetChange);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with living room sunset function:", error);
  }
  try {
    const response = await axios(changeOfficeSunset);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with the office sunset function:", error);
  }
};

//Bedtime function
const bedtime = async () => {
  const goodnight = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/all/state",
    headers: headers,
    data: {
      power: "off",
    },
  };
  try {
    const response = await axios(goodnight);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with bedtime function:", error);
  }
};

// Time check every 5 minutes and functions run according to if statements

let checkInterval = setInterval(checkTime, 300000);

async function checkTime() {
  //get current date and time
  const currentDate = new Date();
  let timeNow = currentDate.toLocaleTimeString();
  // console.log(toHourMin(timeNow))
  //helper function to convert HH:MM:SS AM/PM to hours and minutes numbers only (24 Hour format)
  function toHourMin(time) {
    var [hour, min] = time.split(":").map(Number);
    //  console.log(hour, min)
    let new24Hour;
    if (time.includes("PM") && hour < 12) {
      new24Hour = hour + 12;
      hour = new24Hour;
    }
    return { hour, min };
  }
  //helper function to compare number of minutes between current time and specified time
  function timeDifference(compareHour, compareMin) {
    return Math.abs(
      (toHourMin(timeNow).hour - compareHour) * 60 +
        (toHourMin(timeNow).min - compareMin)
    );
  }

  try {
    const sunTimeValue = await sunTimePromise;
    // console.log(sunTimeValue)
    // console.log(toHourMin(sunTimeValue.sunrise).hour, toHourMin(sunTimeValue.sunrise).min)
    //  console.log(toHourMin(sunTimeValue.sunset).hour, toHourMin(sunTimeValue.sunset).min)
    if (
      timeDifference(8,0) <= 10
    ) {
      wake();
    }
    if (timeDifference(9, 30) <= 10) {
      work();
    }
    if (
      timeDifference(
        toHourMin(sunTimeValue.sunset).hour,
        toHourMin(sunTimeValue.sunset).min
      ) <= 10
    ) {
      sunset();
    }
    if (timeDifference(23, 59) <= 10) {
      bedtime();
    }
  } catch (error) {
    console.error("An error occurred with sunTimePromise:", error);
  }
}

//To stop interval circuit
//clearInterval(checkInterval);
