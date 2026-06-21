# Weather API

A simple Node.js Express API that returns weather data from OpenWeatherMap.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create an OpenWeatherMap API key:
   - https://openweathermap.org/api

3. Start the server:
   ```bash
   set OPENWEATHER_API_KEY=your_api_key
   npm start
   ```

## Usage

Request weather data by city:

```bash
curl "http://localhost:3000/api/weather?city=London"
```

## Endpoints

- `GET /api/weather?city=<city>` - fetch current weather for a city
- `GET /` - health/status endpoint
