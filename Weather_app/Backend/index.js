import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY; // Ensure you have your API key in .env

app.use(cors());
app.use(express.json());

// Weather forecast route
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no`
    );
    res.json(response.data);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// City search route
app.get('/get-city', async (req, res) => {
  try {
    const { search } = req.query;
    console.log('Search query:', search);
    console.log('query',req.query)

    if (search && search.length > 2) {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`
      );
      res.json(response.data);
    } else {
      res.json([]); // return empty array if query too short
    }
  } catch (error) {
    console.error('Error fetching city data:', error.message);
    res.status(500).json({ error: 'Error fetching city data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
