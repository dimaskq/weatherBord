export interface WeatherData {
    name: string
    main: {
        temp: number
    }
    weather: {
        description: string
    }[]
    wind: {
        speed: number
        deg: number
    }
}

export interface ForecastData {
    list: {
        dt: number
        main: {
            temp: number
        }
        weather: {
            description: string
        }[]
    }[]
}
