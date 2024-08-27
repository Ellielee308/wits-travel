import { useState, useEffect, useRef } from "react";
import useGoogleMapsApi from "./useGoogleMapsApi";

const Map = ({ apiKey, spot }) => {
  const maps = useGoogleMapsApi(apiKey);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null); // 地理位置狀態

  useEffect(() => {
    if (maps && !map) {
      const mapInstance = new maps.Map(mapRef.current, {
        center: { lat: 25.03849, lng: 121.53236 }, // 默認位置
        zoom: 14,
      });
      setMap(mapInstance);

      // 地理編碼: 使用城市和景點名稱查找經緯度
      const geocoder = new maps.Geocoder();
      const address = `${spot.subtitle}, ${spot.city}, ${spot.country}`;
      console.log(address);

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          setLocation({ lat, lng });
          mapInstance.setCenter({ lat, lng }); // 更新地圖中心
          console.log({ lat, lng });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      });
    }
  }, [maps, map, spot]);

  return (
    <div>
      {/* 確保地圖容器有高度 */}
      <div ref={mapRef} className="map h-96 w-full"></div>
    </div>
  );
};

export default Map;
