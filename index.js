import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENWEATHER_API_KEY;

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'Missing required query parameter: city' });
  }

  if (!apiKey) {
    return res.status(500).json({
      error: 'OPENWEATHER_API_KEY is not configured',
      hint: 'Set the environment variable OPENWEATHER_API_KEY before starting the server.'
    });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      const body = await response.json();
      return res.status(response.status).json({ error: body.message || 'Unable to fetch weather data' });
    }

    const data = await response.json();
    const result = {
      city: data.name,
      country: data.sys?.country,
      weather: data.weather?.[0]?.description,
      temperature: {
        current: data.main?.temp,
        feels_like: data.main?.feels_like,
        min: data.main?.temp_min,
        max: data.main?.temp_max
      },
      humidity: data.main?.humidity,
      wind: data.wind,
      raw: data
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Weather lookup failed', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Weather API is running. Use /api/weather?city=London');
});

app.listen(port, () => {
  console.log(`Weather API listening on http://localhost:${port}`);
});
