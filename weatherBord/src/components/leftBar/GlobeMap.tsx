import React from 'react'
import Globe from 'react-globe.gl'

interface GlobeMapProps {
    markers: { lat: number; lng: number }[]
}

const GlobeMap: React.FC<GlobeMapProps> = ({ markers }) => (
    <Globe
        width={300}
        height={300}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0, 0, 0, 0)"
        showGraticules={false}
        htmlElementsData={markers}
        htmlElement={(d) => {
            const el = document.createElement('div')
            el.innerHTML = `<svg viewBox="-4 0 36 36">
                <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
                <circle fill="black" cx="14" cy="14" r="7"></circle>
            </svg>`
            el.style.position = 'absolute'
            el.style.color = 'red'
            el.style.width = '20px'
            el.style.cursor = 'pointer'
            el.onclick = () => alert(`Місто: ${d.lat}, ${d.lng}`)
            return el
        }}
    />
)

export default GlobeMap
