import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather, getForecast } from './store/slices/weatherSlice'
import { RootState, AppDispatch } from './store/store'

import '../src/base-styles/style.css'
import LeftBar from './components/leftBar/LeftBar'

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, forecast, loading, error, cities } = useSelector(
        (state: RootState) => state.weather
    )
    const [city, setCity] = useState(cities[0])

    useEffect(() => {
        dispatch(getWeather(city.name))
        dispatch(getForecast(city.name))
    }, [dispatch, city])

    return (
        <main className="main">
            <div className="main__container">
                <LeftBar cities={cities} />
            </div>
        </main>
    )
}

export default App
