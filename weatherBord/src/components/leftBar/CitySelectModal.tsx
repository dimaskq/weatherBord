import React from 'react'

interface CitySelectModalProps {
    isModalOpen: boolean
    cities: { name: string }[]
    onCitySelect: (city: { name: string }) => void
}

const CitySelectModal: React.FC<CitySelectModalProps> = ({
    isModalOpen,
    cities,
    onCitySelect,
}) => {
    return (
        <ul className={`arena__modal ${isModalOpen ? 'open' : ''}`}>
            {cities.map((city) => (
                <li key={city.name} onClick={() => onCitySelect(city)}>
                    {city.name}
                </li>
            ))}
        </ul>
    )
}

export default CitySelectModal
