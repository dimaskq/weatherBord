import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather, getForecast } from "./store/slices/weatherSlice";
import { RootState, AppDispatch } from "./store/store";

import "../src/base-styles/style.css"
import LeftBar from "./components/leftBar/LeftBar";

const cities: string[] = [
  "Київ", "Харків", "Одеса", "Дніпро", "Львів", "Запоріжжя", "Вінниця", "Херсон", 
  "Чернігів", "Полтава", "Черкаси", "Суми", "Рівне", "Івано-Франківськ", 
  "Тернопіль", "Луцьк", "Ужгород", "Кропивницький", "Житомир", "Миколаїв", "Чернівці"
];

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, forecast, loading, error } = useSelector((state: RootState) => state.weather);
  const [city, setCity] = useState<string>(cities[0]);

  useEffect(() => {
    dispatch(getWeather(city));
    dispatch(getForecast(city));
  }, [dispatch, city]);

  return (
    <main className="main">
        <div className="main__container">
            <LeftBar />
        </div>
      {/* <h1>Weather Dashboard</h1>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {loading && <p>Завантаження...</p>}
      {error && <p>Помилка: {error}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Температура: {Math.ceil(data.main.temp)}°C</p>
          <p>Погода: {data.weather[0].description}</p>
          <p>Швидкість вітру: {data.wind.speed} м/с</p>
        </div>
      )}


      {forecast && (
        <div>
          <h3>Прогноз на 5 днів</h3>
          <ul>
            {forecast.list
              .filter((_, index) => index % 8 === 0) 
              .map((item) => (
                <li key={item.dt}>
                  <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                  <p>Температура: {Math.ceil(item.main.temp)}°C</p>
                  <p>Погода: {item.weather[0].description}</p>
                </li>
              ))}
          </ul>
        </div>
      )} */}
    </main>
  );
}

export default App;
