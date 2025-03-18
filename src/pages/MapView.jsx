import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ gpsData }) => {
    return (
        <MapContainer center={[gpsData.latitude, gpsData.longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[gpsData.latitude, gpsData.longitude]}>
                <Popup>📍 Vitesse : {gpsData.speed} km/h</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapView;
