// Select elements
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchBtn');
const resultContainer = document.getElementById('result');
const toggleTheme = document.getElementById('toggleTheme');
const api_key = "accd6d5b940c9be5a18ac2b75e519844";

// Function to fetch data from API
async function fetchData(query) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api_key}&units=metric`);
        
        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayData(data);
    } catch (error) {
        resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error fetching data:', error);
    }    
}

// Function to display data
function displayData(data) {
    resultContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Event listener for search
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Trim to remove extra spaces
    if (query) {
        fetchData(query);
    } else {
        resultContainer.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
    }
});

// Dark/Light mode toggle
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
