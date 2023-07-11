import axios from "axios";
import { headers } from "./config.js";
import { sunTimePromise } from "./sun.js";


// Sunrise function
const sunrise = async () => {
  const sunriseChange = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/id:d073d56e2210,id:d073d529bc2f,id:d073d5432b28/state",
    headers: headers,
    data: {
      duration: 1,
      fast: false,
      color: "#F39C12",
      brightness: 0.4,
      power: "on",
    },
  };

  try {
    const response = await axios(sunriseChange);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with sunrise function:", error);
  }
};

//Work function
const work = async () => {
  const offExceptOffice = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/id:d073d5432b28,id:d073d529bc2f,id:d073d56e2210/state",
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
    console.error("An error occurred with work function:", error);
  }
  try {
    const response = await axios(changeOffice);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with work function for office:", error);
  }
};

//Sunset function
const sunset = async () => {
  const sunsetChange = {
    method: "PUT",
    url: "https://api.lifx.com/v1/lights/id:d073d56e2210,id:d073d529bc2f/state",
    headers: headers,
    data: {
      duration: 1,
      fast: false,
      color: "#F39C12",
      brightness: 0.4,
      power: "on",
    },
  };
  const sunsetChangeOfficeBedroom = {
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
    console.error("An error occurred with sunset function:", error);
  }
  try {
    const response = await axios(sunsetChangeOfficeBedroom);
    //console.log(response.data);
  } catch (error) {
    console.error("An error occurred with sunset function for office:", error);
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

// Time check every minute and functions run according to if statements
let checkInterval = setInterval(checkTime, 1000);

async function checkTime() {
  const currentDate = new Date();
  let time = currentDate.toLocaleTimeString();
  // console.log({time});
  try {
    const sunTimeValue = await sunTimePromise;
    // console.log(sunTimeValue.sunrise)
    // console.log(sunTimeValue.sunset)
    if (time === sunTimeValue.sunrise) {
      sunrise();
    }
    if (time === "9:00:00 AM") {
      work();
    }
    if (time === sunTimeValue.sunset) {
      sunset();
    }
    if (time === "11:00:00 PM") {
      bedtime();
    }
  } catch (error) {
    console.error("An error occurred with sunTimePromise:", error);
  }
}

//To stop interval circuit
clearInterval(checkInterval);
