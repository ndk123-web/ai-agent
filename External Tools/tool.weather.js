import axios from 'axios';

async function weatherTool({city}) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
  const geoRes = await axios.get(geoUrl);
  
  if (!geoRes.data.results) return "City not found";
  const { latitude, longitude } = geoRes.data.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const weatherRes = await axios.get(weatherUrl);

  return weatherRes.data.current_weather;
}

// Example
// weatherTool("Mumbai").then(console.log);

export { weatherTool };