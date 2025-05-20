
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/lib/constants";
import { MapPin, Navigation, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Add TypeScript type for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadLeafletMap = () => {
      if (!mapRef.current) return;

      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const leafletCss = document.createElement("link");
        leafletCss.rel = "stylesheet";
        leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(leafletCss);
      }

      if (!document.querySelector('script[src*="leaflet.js"]')) {
        const leafletScript = document.createElement("script");
        leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        leafletScript.onload = () => {
          const interval = setInterval(() => {
            if (window.L) {
              clearInterval(interval);
              initMap();
            }
          }, 100);
        };
        document.head.appendChild(leafletScript);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.L) return;
      mapRef.current.innerHTML = "";

      const map = window.L.map(mapRef.current).setView(
        [contactInfo.location.lat, contactInfo.location.lng],
        16
      );

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = window.L.marker([
        contactInfo.location.lat,
        contactInfo.location.lng,
      ]).addTo(map);

      marker.bindPopup(contactInfo.address).openPopup();
      setMapLoaded(true);
    };

    loadLeafletMap();
  }, []);

  return (
    <div className="my-8">
      <Card className="rounded-xl shadow-lg overflow-hidden">
        <div
          ref={mapRef}
          id="map"
          className="w-full relative bg-gray-100"
          style={{ height: "450px" }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500">Chargement de la carte...</div>
            </div>
          )}
        </div>
        <CardContent className="bg-white p-6">
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-primary mr-2" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex space-x-4 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${contactInfo.location.lat},${contactInfo.location.lng}`,
                    "_blank"
                  )
                }
              >
                <Navigation className="h-4 w-4 mr-1" />
                Itinéraire
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  (window.location.href = `tel:${contactInfo.phone.replace(/\s/g, "")}`)
                }
              >
                <Phone className="h-4 w-4 mr-1" />
                Appeler
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
