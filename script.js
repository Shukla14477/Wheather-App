async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=260c65cd60f945eeac9164914250306&q=${encodeURIComponent(city)}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        const weatherHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p>${data.current.condition.text}</p>
          <p>🌡️ ${data.current.temp_c}°C</p>
          <p>💧 Humidity: ${data.current.humidity}%</p>
          <p>💨 Wind: ${data.current.wind_kph} kph</p>
        `;

        document.getElementById("weatherInfo").innerHTML = weatherHTML;
    } catch (error) {
        document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}