import React from 'react'

interface WindIndicatorProps {
    windSpeed: number
    windDirection: number
}

const WindIndicator: React.FC<WindIndicatorProps> = ({
    windSpeed,
    windDirection,
}) => {
    const getDangerColor = (speed: number) =>
        speed < 5 ? '#00AEEF' : speed < 15 ? '#FFC107' : '#FF5722'

    const color = getDangerColor(windSpeed)
    const progress = Math.min(windSpeed, 20) / 20

    const startX = 20,
        startY = 90,
        endX = 120,
        endY = 20,
        controlX = 75,
        controlY = 100
    const indicatorX =
        (1 - progress) ** 2 * startX +
        2 * (1 - progress) * progress * controlX +
        progress ** 2 * endX
    const indicatorY =
        (1 - progress) ** 2 * startY +
        2 * (1 - progress) * progress * controlY +
        progress ** 2 * endY

    return (
        <div className="leftBar__wind">
            <p className="leftBar__wind_text">
                <svg
                    className="leftBar__wind_arrow"
                    viewBox="0 0 38 32"
                    style={{
                        transform: `rotate(${windDirection}deg)`,
                        transition: 'transform 0.3s ease-in-out',
                    }}
                >
                    <polygon
                        points="16,2 10,18 16,14 22,18"
                        fill="white"
                        stroke="white"
                        strokeWidth="5"
                    />
                </svg>
                Wind speed: {windSpeed} m/s
            </p>
            <div className="leftBar__wind_bar">
                <svg
                    width="150"
                    height="100"
                    viewBox="0 0 150 100"
                    className="leftBar__wind_svg"
                >
                    <text
                        x="5"
                        y="15"
                        fill="white"
                        fontSize="0.7rem"
                        fontWeight="bold"
                    >
                        Wind Safety
                    </text>
                    <path
                        d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                        stroke="url(#grad)"
                        strokeWidth="1.4"
                        fill="transparent"
                    />
                    <circle
                        cx={indicatorX}
                        cy={indicatorY}
                        r="2"
                        fill={color}
                    />
                    <defs>
                        <linearGradient
                            id="grad"
                            x1="0%"
                            y1="50%"
                            x2="100%"
                            y2="50%"
                        >
                            <stop offset="0%" stopColor="#00AEEF" />
                            <stop offset="50%" stopColor="#FFC107" />
                            <stop offset="100%" stopColor="#FF5722" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default WindIndicator
