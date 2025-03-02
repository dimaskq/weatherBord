import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchWeather, fetchForecast } from '../../api/weatherApi'
import { WeatherData, ForecastData } from '../../types/weather'

interface SelectedCity {
    name: string
    lat: number
    lng: number
}

interface WeatherState {
    data: WeatherData | null
    forecast: ForecastData | null
    loading: boolean
    error: string | null
    selectedCity: SelectedCity
    wind: { speed: number; deg: number } | null
    cities: SelectedCity[]
}

export const getWeather = createAsyncThunk<WeatherData, string>(
    'weather/getWeather',
    fetchWeather
)

export const getForecast = createAsyncThunk<ForecastData, string>(
    'weather/getForecast',
    fetchForecast
)

const initialState: WeatherState = {
    data: null,
    forecast: null,
    loading: false,
    error: null,
    selectedCity: { name: 'Kyiv', lat: 50.45, lng: 30.52 },
    wind: null,
    cities: [
        { name: 'Kyiv', lat: 50.45, lng: 30.52 },
        { name: 'Kharkiv', lat: 49.99, lng: 36.23 },
        { name: 'Odesa', lat: 46.48, lng: 30.73 },
        { name: 'Dnipro', lat: 48.45, lng: 34.98 },
        { name: 'Lviv', lat: 49.84, lng: 24.03 },
        { name: 'Zaporizhzhia', lat: 47.84, lng: 35.14 },
        { name: 'Vinnytsia', lat: 49.23, lng: 28.48 },
        { name: 'Kherson', lat: 46.63, lng: 32.62 },
        { name: 'Chernihiv', lat: 51.5, lng: 31.3 },
        { name: 'Poltava', lat: 49.59, lng: 34.55 },
    ],
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<SelectedCity>) => {
            state.selectedCity = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getWeather.fulfilled,
                (state, action: PayloadAction<WeatherData>) => {
                    state.loading = false
                    state.data = action.payload
                    // Зберігаємо дані про вітер, якщо вони є
                    state.wind = action.payload.wind
                        ? {
                              speed: action.payload.wind.speed,
                              deg: action.payload.wind.deg,
                          }
                        : null
                }
            )
            .addCase(getWeather.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Помилка'
            })
            .addCase(getForecast.pending, (state) => {
                state.loading = true
            })
            .addCase(
                getForecast.fulfilled,
                (state, action: PayloadAction<ForecastData>) => {
                    state.loading = false
                    state.forecast = action.payload
                }
            )
            .addCase(getForecast.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Помилка'
            })
    },
})

export const { setCity } = weatherSlice.actions
export default weatherSlice.reducer
