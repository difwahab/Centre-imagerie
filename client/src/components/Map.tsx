import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/lib/constants";
import { MapPin, Navigation, Info, Phone, Mail, Clock } from "lucide-react";
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

  // Map initialization function
  useEffect(() => {
    // Enhanced map implementation with Leaflet (open-source)
    const loadLeafletMap = () => {
      // Only load if the map ref exists
      if (!mapRef.current) return;

      // Create and add Leaflet CSS if not present
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCss.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCss.crossOrigin = '';
        document.head.appendChild(leafletCss);
      }

      // Create and add Leaflet script if not present
      if (!document.querySelector('script[src*="leaflet.js"]')) {
        const leafletScript = document.createElement('script');
        leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        leafletScript.crossOrigin = '';
        leafletScript.onload = () => {
  // ✅ Attendre que Leaflet soit bien chargé dans window.L
  const interval = setInterval(() => {
    if (window.L) {
      clearInterval(interval);
      initMap();
    }
  }, 100);
};;
        document.head.appendChild(leafletScript);
      } else {
        // If script is already loaded, initialize map directly
        initMap();
      }
    };

    // Initialize the map with Leaflet
    function initMap() {
      if (!mapRef.current || !window.L) return;

      // Clear any existing map
      mapRef.current.innerHTML = '';
      
      // Initialize map
      const map = window.L.map(mapRef.current).setView([contactInfo.location.lat, contactInfo.location.lng], 16);

      // Add OpenStreetMap tiles with custom styling
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      
      // Force map to invalidate size after container is visible
      setTimeout(() => {
        map.invalidateSize();
      }, 500);

      // Custom icon for marker
      const customIcon = window.L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #0056b3; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      // Add marker with custom icon
      const marker = window.L.marker([contactInfo.location.lat, contactInfo.location.lng], {
        icon: customIcon,
        title: "Centre D'Imagerie Benameur"
      }).addTo(map);

      // Create a popup for the marker with enhanced styling
      const popupContent = `
        <div style="font-family: 'Open Sans', sans-serif; padding: 12px; min-width: 220px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-family: 'Poppins', sans-serif; font-weight: bold; margin-bottom: 10px; color: #0056b3; font-size: 17px; border-bottom: 2px solid #e0f0ff; padding-bottom: 8px;">Centre D'Imagerie Benameur</h3>
          <p style="font-size: 14px; margin: 0 0 12px 0; color: #333;">${contactInfo.address}</p>
          <p style="font-size: 13px; margin: 0 0 12px 0; color: #666;"><span style="color: #0056b3; font-weight: 600;">Tél:</span> ${contactInfo.phone}</p>
          <div style="display: flex; justify-content: space-between;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${contactInfo.location.lat},${contactInfo.location.lng}" 
               target="_blank" 
               style="color: #0056b3; text-decoration: none; font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; background-color: #e0f0ff; padding: 6px 10px; border-radius: 4px; transition: background-color 0.3s;">
              <span style="margin-right: 4px;">Itinéraire</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            </a>
            <a href="tel:${contactInfo.phone.replace(/\s/g, '')}" 
               style="color: #0056b3; text-decoration: none; font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; background-color: #e0f0ff; padding: 6px 10px; border-radius: 4px; transition: background-color 0.3s;">
              <span style="margin-right: 4px;">Appeler</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>
      `;

      // Bind popup to marker
      marker.bindPopup(popupContent);
      
      // Open popup on load
      marker.openPopup();

      // Add a more visible circle around the marker to highlight the area
      window.L.circle([contactInfo.location.lat, contactInfo.location.lng], {
        color: '#0056b3',
        fillColor: '#0056b3',
        fillOpacity: 0.15,
        radius: 200,
        weight: 2
      }).addTo(map);
      
      // Add a directional marker to help with orientation
      const directionIcon = window.L.divIcon({
        className: 'direction-icon',
        html: `<div style="font-size: 24px; color: #0056b3; font-weight: bold;">↑</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      // Place the directional marker 250m north of the center
      window.L.marker([contactInfo.location.lat + 0.0022, contactInfo.location.lng], {
        icon: directionIcon,
        title: "Centre Ville"
      }).addTo(map);

      setMapLoaded(true);
    }

    loadLeafletMap();

    // Cleanup function
    return () => {
      if (mapRef.current && window.L && window.L.map) {
        // Get all maps and find the one associated with our element
        const maps = Object.values(window.L._leaflet_id_map || {});
        for (const mapInstance of maps) {
          if (mapInstance && 
              typeof mapInstance === 'object' && 
              '_container' in mapInstance && 
              mapInstance._container === mapRef.current) {
            // TypeScript safety: cast to any before accessing remove method
            (mapInstance as any).remove();
            break;
          }
        }
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <Card className="rounded-xl shadow-lg overflow-hidden md:col-span-8 h-full">
        <div 
          ref={mapRef} 
          id="map" 
          className="w-full h-[450px] bg-gray-100 relative"
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-500">Chargement de la carte...</p>
            </div>
          )}
        </div>
        <CardContent className="bg-white p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-primary text-lg">Comment nous trouver</h4>
                <p className="text-gray-700">
                  Notre centre est idéalement situé à proximité du centre-ville d'Oran. Parking gratuit disponible pour tous nos patients.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <h5 className="font-semibold text-primary">Adresse exacte</h5>
              </div>
              <p className="text-gray-700 mb-2">{contactInfo.address}</p>
              <p className="text-gray-700 mb-2"><span className="font-medium">Téléphone:</span> {contactInfo.phone}</p>
              <p className="text-gray-700 mb-3"><span className="font-medium">Coordonnées GPS:</span> {contactInfo.location.lat.toFixed(6)}, {contactInfo.location.lng.toFixed(6)}</p>
              
              <div className="flex space-x-4 mt-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.location.lat},${contactInfo.location.lng}`, '_blank')}
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  <span>Itinéraire</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center"
                  onClick={() => window.location.href = `tel:${contactInfo.phone.replace(/\s/g, '')}`}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  <span>Appeler</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info Card */}
      <Card className="rounded-xl shadow-lg md:col-span-4 bg-primary text-white overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-secondary relative">
          <div className="absolute inset-0 opacity-20" 
               style={{backgroundImage: 'url("https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800")', 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center'}}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-2xl font-bold">Nos coordonnées</h3>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex">
              <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Adresse</h4>
                <p className="opacity-90">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex">
              <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Téléphone</h4>
                <p className="opacity-90">{contactInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex">
              <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <a href={`mailto:${contactInfo.email}`} className="opacity-90 hover:underline">{contactInfo.email}</a>
              </div>
            </div>
            
            <div className="flex">
              <Clock className="h-6 w-6 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Horaires d'ouverture</h4>
                <div className="space-y-1 opacity-90">
                  <p>Lundi - Vendredi: 8h00 - 18h00</p>
                  <p>Samedi: 8h00 - 13h00</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
