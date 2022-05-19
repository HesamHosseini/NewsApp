const input = document.getElementsByTagName("input")[0];
const triggerInput = document.getElementById("triggerInput");
const getLocation = document.getElementById("getDeviceLocation");
const modal = document.getElementsByClassName("popUpWeatherContainer")[0];

let weatherData;
class WeatherApi {
  constructor() {}

  static async fetchAPI_IP() {
    const chromeAPI = "http://ip-api.com/json/";
    const res = await fetch(chromeAPI);
    const city = await res.json();
    return await city;
  }

  static fetchUserLocation() {
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
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    return latLong;
  }

  static async fetchCordsCityName(lat, long) {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=362eae9e02344749b2ce47d063900456`
    );
    const locationInfo = await res.json();
    return locationInfo;
  }

  static async fetchCityWeather(cityName) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4c76102d339696a4f37636f9ad7219ba&units=metric`
    );
    const weather = await res.json();
    return await weather;
  }

  static modalPainter(weatherLog) {
    modal.innerHTML = `
  <div class="modalHeader d-flex flex-row mx-3">
              <div class="returnBtn pt-2">
                <img src="./assets/img/return.svg" alt="return" />
              </div>
              <h1 class="px-5 py-2">weather App</h1>
            </div>
            <div class="d-flex flex-column">
              <div class="weatherImgContainer text-center">
                <img
                  src="https://openweathermap.org/img/wn/${weatherLog.weather[0].icon}@2x.png"
                  alt="weatherImg"
                />
              </div>
              <div class="weatherTemp text-center text-capitalize">
                <span>${weatherLog.main.temp}</span>°C<span></span>
              </div>
              <div class="weatherSummery text-center fs-2">
                ${weatherLog.weather[0].description}
              </div>
              <div class="weatherLocation text-center pb-5">
                <span>
                  <img src="./assets/img/location.svg" alt="location" />
                </span>
                <span>${weatherLog.name} </span> ,
                <span>${weatherLog.sys.country}</span>
              </div>
              <div class="row text-center">
                <div class="col">
                  <div
                    class="d-flex p-3 flex-row justify-content-center align-items-center"
                    style="border-right: 0.5px solid gray"
                  >
                    <div>
                      <img
                        class="humidityAndtemretureIcon"
                        src="./assets/img/tempreture.svg"
                        alt="tempreture"
                      />
                    </div>
                    <div class="d-flex flex-column">
                      <div class="fs-2"><span>${weatherLog.main.feels_like}</span>°C<span></span></div>
                      <div>Feels like</div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div
                    class="d-flex p-3 flex-row justify-content-center align-items-center"
                    style="border-right: 0.5px solid gray"
                  >
                    <div>
                      <img
                        class="humidityAndtemretureIcon"
                        src="./assets/img/humidity.svg"
                        alt="humidity"
                      />
                    </div>
                    <div class="d-flex flex-column">
                      <div class="fs-2"><span>${weatherLog.main.humidity}</span>%<span></span></div>
                      <div>Humidity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
    const backBtn = document.getElementsByClassName("returnBtn")[0];
    backBtn.addEventListener("click", WeatherApi.reset);
    modal.classList.add("animation");
    input.value = "";
  }
  static reset() {
    modal.innerHTML = "";
    modal.classList.remove("animation");
  }
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    triggerInput.click();
  }
});
const cords = WeatherApi.fetchUserLocation();

const weatherGetter = async () => {
  const cityName = input.value;
  const weather = await WeatherApi.fetchCityWeather(cityName);
  console.log(weather);
  WeatherApi.modalPainter(weather);
};
const chromeOrNot = async () => {
  if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
    // debugger;
    const cityName = await WeatherApi.fetchAPI_IP();
    const weather = await WeatherApi.fetchCityWeather(cityName.city);
    console.log(await weather);
    WeatherApi.modalPainter(weather);
  } else {
    console.log(cords);

    const locationInfo = await WeatherApi.fetchCordsCityName(
      cords.latitude,
      cords.longitude
    );
    const address = await locationInfo.results[0].formatted;
    const cityName = address.split(",")[0];
    const weather = await WeatherApi.fetchCityWeather(cityName);
    console.log(await weather);
    WeatherApi.modalPainter(weather);
  }
};
triggerInput.addEventListener("click", weatherGetter);
getLocation.addEventListener("click", chromeOrNot);
