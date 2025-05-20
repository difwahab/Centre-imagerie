
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { contactInfo } from '@/lib/constants';

// Corrige l'icône par défaut de Leaflet qui ne s'affiche pas sans config
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapReactLeaflet() {
  const position = [contactInfo.location.lat, contactInfo.location.lng];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Carte React-Leaflet</h2>
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '450px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {contactInfo.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
