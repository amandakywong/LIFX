import axios from "axios";
import 'dotenv/config';

const headers = {
    Accept: 'application/json',
    Authorization: process.env.LIFX_API_KEY,
  };
export {headers};

// functions below for finding out details including light IDs and scene IDs

// Details of all LIFX lights
const listLights = {
  method: "GET",
  url: "https://api.lifx.com/v1/lights/all",
  headers: headers,
};

axios
  .request(listLights)
  .then(function (response) {
  //  console.log(response.data);
  })
  .catch(function (error) {
    console.error(error.response.data); 
  });

// Details of all Scenes
const getScenes = {
  method: "GET",
  url: "https://api.lifx.com/v1/scenes",
  headers: headers,
};
axios
  .request(getScenes)
  .then(function (response) {
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
