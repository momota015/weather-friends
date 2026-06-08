"use strict";
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("city");
const rabbit = document.querySelector(".animal img");
const homeBtn = document.getElementById("homeBtn");

const apiKey = "24ed62929434550498351de06fd7fa57";

//天候背景変更関数
function changeBackground(weather) {
  if (weather === "Clear") {
    document.body.className = "clear";
  } else if (weather === "Clouds") {
    document.body.className = "clouds";
  } else if (weather === "Rain") {
    document.body.className = "rain";
  }
}

//天候動物変更関数
function changeAnimal(weather) {
  if (weather === "Clear") {
    rabbit.src = "image/hare.png";
  } else if (weather === "Clouds") {
    rabbit.src = "image/kuma.png";
  } else if (weather === "Rain") {
    rabbit.src = "image/kurage.png";
  }
}

//天気表示関数
function displayWeather(data, dateText, rainChance, maxTemp, minTemp) {
  weatherResult.innerHTML = `
        <div class="weather-info">
            <p class="date">${dateText}</p>
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        
            <div class="temp">${Math.round(data.main.temp)}°</div>
            
            <div class="temp-range">
                <span class="max">
                    <i class="fa-solid fa-temperature-high"></i>
                    ${maxTemp}°
                </span>

                <span class="min">
                    <i class="fa-solid fa-temperature-low"></i>
                    ${minTemp}°
                </span>
            </div>
            
            <p>${data.weather[0].description}</p>
            
            <p><i class="fas fa-droplet"></i> ${data.main.humidity}%</p>
            
            <p><i class="fa-solid fa-cloud-rain"></i> ${rainChance}%</p>
        </div>
    `;
}

//クリックで天候表示
searchBtn.addEventListener("click", function () {
  const city = document.getElementById("city").value;

  // 入力チェック
  if (city.trim() === "") {
    //weather-card表示
    document.querySelector(".weather-card").style.display = "block";
    weatherResult.innerHTML = `
        <p>都市名を入力してください</p>
    `;
    return;
  }

  document.querySelector(".weather-card").style.display = "block";

  weatherResult.innerHTML = `
    <div class="loading">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>Now Loading...</p>
    </div>
`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`,
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      //エラー表示
      if (data.cod == "404") {
        //weather-card表示
        document.querySelector(".weather-card").style.display = "block";
        weatherResult.innerHTML = `
            <p>都市が見つかりませんでした。</p>
        `;
        return;
      }

      document.querySelector(".weather-card").style.display = "block";

      const city = data.name;
      //日付表示
      const today = new Date();
      const dateText = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      //weather取得
      const weather = data.weather[0].main;
      console.log(weather);
      // 背景変更
      changeBackground(weather);
      // 動物変更
      changeAnimal(weather);

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`,
      )
        .then((response) => response.json())
        .then((forecastData) => {
          //降水確率追加
          const rainChance = Math.round(forecastData.list[0].pop * 100);

          // 今日の気温一覧
          const todayTemps = forecastData.list
            .slice(0, 8)
            .map((item) => item.main.temp);

          const maxTemp = Math.round(Math.max(...todayTemps));

          const minTemp = Math.round(Math.min(...todayTemps));

          displayWeather(data, dateText, rainChance, maxTemp, minTemp);
        });
    });
});

//Enterで検索できるようにする
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

//ホームボタンリセット設定
homeBtn.addEventListener("click", function () {
  // 入力を空にする
  cityInput.value = "";
  // 表示をリセット
  weatherResult.innerHTML = "";
  // カード非表示
  document.querySelector(".weather-card").style.display = "none";
  // 背景リセット
  document.body.className = "";
  // 動物を初期状態に戻す
  rabbit.src = "image/top.png";
});

//広告表示設定
const closeAd = document.getElementById("closeAd");
const adBanner = document.getElementById("adBanner");

closeAd.addEventListener("click", function () {
  adBanner.style.display = "none";
});

// 天気検索処理
let searchCount = 0;
searchBtn.addEventListener("click", function () {
  searchCount++;
  if (searchCount % 3 === 0) {
    adBanner.style.display = "block";
  }
});
