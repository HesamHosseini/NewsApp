class WeatherApi {
  constructor() {}

  static async fetchAPI_IP() {
    const chromeAPI = "http://ip-api.com/json/";
    const res = await fetch(chromeAPI);
    const city = await res.json();
    return await city;
  }

  static async fetchUserLocation() {
    const latLong = {};
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      latLong.latitude = latitude;
      latLong.longitude = longitude;
    };
    const errorCallback = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
    });
    return latLong;
  }

  static async GeoLocationToCityApi(lat, long) {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=362eae9e02344749b2ce47d063900456`
    );
    const locationInfo = await res.json();
    return await locationInfo.results[0].components.city;
  }

  static final() {
    // const cords = WeatherApi.fetchUserLocation();
    // console.log(cords);
    // const mamad = WeatherApi.GeoLocationToCityApi(
    //   cords.latitude,
    //   cords.longitude
    // );
    // console.log(await mamad);
    const a = WeatherApi.fetchUserLocation().then((cords) => {
      return cords;
    });
    console.log(a);
  }
}

// function clgFunc() {
//   console.log("trigered");
// }

// const a = document.getElementsByTagName("input")[0];
// console.log(a);
// a.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("triggerInput").click();
//   }
// });
