import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";

const VoitureDetails = () => {
    const { id } = useParams();
    const [gpsData, setGpsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGpsData = async () => {
            try {
                const res = await axios.get(`http://e0oowcgs8kk0gkkoks84swso.157.180.35.88.sslip.io/api/gps/${id}`);
                setGpsData(res.data);
            } catch (err) {
                console.error("Erreur API :", err);
                setError("Impossible de récupérer la position GPS.");
            } finally {
                setLoading(false);
            }
        };

        fetchGpsData();
    }, [id]);

    const voitureIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1086/1086534.png", // Icône de voiture
        iconSize: [50, 50], // Taille de l'icône
        iconAnchor: [25, 50], // Point d'ancrage
        popupAnchor: [0, -50], // Déplacement du popup
    });

    return (
        <div>
            <Header />
            <div className="container">
                <h2>📍 Localisation de la Voiture</h2>

                {loading && <p>Chargement des données...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && gpsData && (
                    <MapContainer
                        center={[gpsData.latitude, gpsData.longitude]}
                        zoom={15}
                        style={{ height: "500px", width: "100%", borderRadius: "10px", border: "1px solid #ddd" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[gpsData.latitude, gpsData.longitude]} icon={voitureIcon}>
                            <Popup>
                                🚗 <b>Voiture ID:</b> {gpsData._id} <br />
                                📡 <b>Vitesse:</b> {gpsData.speed} km/h <br />
                                ⏱ <b>Dernière mise à jour:</b> {new Date(gpsData.timestamp).toLocaleString()}
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </div>
    );
};

export default VoitureDetails;
