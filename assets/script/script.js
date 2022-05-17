// const successCallback = (position) => {
//   console.log(position);
// };

// const errorCallback = (error) => {
//   console.error("shit");
// };

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
//   enableHighAccuracy: true,
// });
const chromeAPI = "http://ip-api.com/json/";
class WeatherApi {
  constructor() {
    let city = undefined;
    if (window.chrome) {

    }
  }

  static async fetchAPI_IP() {
    const res = await fetch(chromeAPI);
    const city = await res.json();
    console.log(await city);
  }


  cityCaller() {
    console.log(this.city);
  }
}

const a = new WeatherApi();
// ******************************************************************************

// const getData = async () => {
//     const res = await fetch(API_URL);
//     data = await res.json();
//   };

//   async function postData(data) {
//     const res = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   }

// ******************************************************************************

// if (location.protocol != "https:") {
//   console.log("shit");
// }
