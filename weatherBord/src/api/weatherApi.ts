import { WeatherData, ForecastData } from "../types/weather";

const API_KEY = "fc3e67dd24a874cf494050dd73913bd2";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) throw new Error("Не вдалося отримати поточні дані");
  return response.json();
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) throw new Error("Не вдалося отримати прогноз погоди");
  return response.json();
};
