import { useState, useEffect } from "react";

const useGoogleMapsApi = (apiKey) => {
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setMaps(window.google.maps);
      return;
    }

    const loadGoogleMaps = () => {
      const existingScript = document.querySelector(
        `script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"]`,
      );

      if (existingScript) {
        existingScript.onload = () => {
          setMaps(window.google.maps);
        };
        return;
      }

      // 創建並加載 Google Maps API 腳本，並確保異步加載
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true; // 確保腳本異步加載
      script.defer = true; // 延遲執行，直到 DOM 解析完成
      script.onload = () => {
        setMaps(window.google.maps);
      };
      script.onerror = (error) => {
        console.error("Failed to load Google Maps API:", error);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [apiKey]);

  return maps;
};

export default useGoogleMapsApi;
