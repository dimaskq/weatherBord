import "./leftBar-styles/leftBar.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Globe from "react-globe.gl";
import { useEffect, useState } from "react";

const GlobeComponent = () => {
    const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;
  
    const [gData, setGData] = useState([]);
  
    useEffect(() => {
      const N = 30;
      setGData([...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: 7 + Math.random() * 30,
        color: ["red", "white", "blue", "green"][Math.floor(Math.random() * 4)]
      })));
    }, []);
  
    return (
        <Globe
        width={300} 
        height={300} 
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg" 
        backgroundColor="rgba(0, 0, 0, 0)"
        showGraticules={false} 
      />
    );
  };

const LeftBar = () => {
  const windSpeed = useSelector((state: RootState) => state.weather.data?.wind.speed || 0);
  const windDirection = useSelector((state: RootState) => state.weather.data?.wind.deg || 0);

  const getDangerColor = (speed: number) => {
    if (speed < 5) return "#00AEEF";
    if (speed < 15) return "#FFC107";
    return "#FF5722";
  };

  const color = getDangerColor(windSpeed);
  const clampedSpeed = Math.min(windSpeed, 20);
  const progress = clampedSpeed / 20;

  const startX = 20, startY = 90;
  const endX = 120, endY = 20;
  const controlX = 75, controlY = 100;

  const indicatorX = (1 - progress) ** 2 * startX + 2 * (1 - progress) * progress * controlX + progress ** 2 * endX;
  const indicatorY = (1 - progress) ** 2 * startY + 2 * (1 - progress) * progress * controlY + progress ** 2 * endY;

  return (
    <section className="leftBar">
      <div className="leftBar__container">
        <h2 className="leftBar__title">Weather Board</h2>
        <div className="leftBar__wind">
          <p className="leftBar__wind_text">
            <svg 
              className="leftBar__wind_arrow"
              viewBox="0 0 38 32"
              style={{ transform: `rotate(${windDirection}deg)`, transition: "transform 0.3s ease-in-out" }}
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
            <svg width="150" height="100" viewBox="0 0 150 100" className="leftBar__wind_svg">
              <text x="5" y="15" fill="white" fontSize="0.7rem" fontWeight="bold">Wind Safety</text>
              <path d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                stroke="url(#grad)" strokeWidth="1.4" fill="transparent"/> 
              <circle cx={indicatorX} cy={indicatorY} r="2" fill={color} /> 
              <defs>
                <linearGradient id="grad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#00AEEF" />
                  <stop offset="50%" stopColor="#FFC107" />
                  <stop offset="100%" stopColor="#FF5722" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="leftBar__arena">
            <p className="leftBar__arena_title">Select Arena</p>
            <div className="leftBar__globe">
                <GlobeComponent />
            </div>
            <button className="leftBar__arena_btn">Kiyv, Ukraine</button>
        </div>
      </div>
    </section>
  );
};

export default LeftBar;
