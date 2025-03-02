import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import {
    getWeather,
    getForecast,
    setCity,
} from '../../store/slices/weatherSlice'
import WindIndicator from './WindIndicator'
import CitySelectModal from './CitySelectModal'
import GlobeMap from './GlobeMap'

import './leftBar-styles/leftBar.css'

const LeftBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { wind, selectedCity, cities } = useSelector(
        (state: RootState) => state.weather
    )
    const windSpeed = wind?.speed || 0
    const windDirection = wind?.deg || 0
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => setIsModalOpen((prev) => !prev)

    const handleCitySelect = (city) => {
        dispatch(setCity(city))
        setIsModalOpen(false)
        dispatch(getWeather(city.name))
        dispatch(getForecast(city.name))
    }

    const markers = useMemo(
        () => [{ lat: selectedCity.lat, lng: selectedCity.lng }],
        [selectedCity]
    )

    return (
        <section className="leftBar">
            <div className="leftBar__container">
                <h2 className="leftBar__title">Weather Board</h2>
                <WindIndicator
                    windSpeed={windSpeed}
                    windDirection={windDirection}
                />
                <div className="leftBar__arena">
                    <p className="leftBar__arena_title">Select Arena</p>
                    <CitySelectModal
                        isModalOpen={isModalOpen}
                        cities={cities}
                        onCitySelect={handleCitySelect}
                    />
                    {!isModalOpen && (
                        <div className="leftBar__globe">
                            <GlobeMap markers={markers} />
                        </div>
                    )}
                    <button
                        className="leftBar__arena_btn"
                        onClick={toggleModal}
                    >
                        {isModalOpen
                            ? 'Back'
                            : `${selectedCity?.name}, Ukraine`}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LeftBar
