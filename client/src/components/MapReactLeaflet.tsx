import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { contactInfo } from '@/lib/constants';

// Correction : Suppression de `_getIconUrl`, qui n'est plus nécessaire
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapReactLeaflet() {
  // Assurer que position est bien typé
  const position: [number, number] = [contactInfo.location.lat, contactInfo.location.lng];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Carte de notre localisation</h2>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '450px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-sm">{contactInfo.address}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
