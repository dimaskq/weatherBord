import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeather, fetchForecast } from "../../api/weatherApi";
import { WeatherData, ForecastData } from "../../types/weather";

interface WeatherState {
  data: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}

export const getWeather = createAsyncThunk<WeatherData, string>("weather/getWeather", fetchWeather);
export const getForecast = createAsyncThunk<ForecastData, string>("weather/getForecast", fetchForecast);

const initialState: WeatherState = {
  data: null,
  forecast: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка";
      })

      .addCase(getForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(getForecast.fulfilled, (state, action: PayloadAction<ForecastData>) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка";
      });
  },
});

export default weatherSlice.reducer;
