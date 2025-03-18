import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles.css";

const Dashboard = () => {
    const [voitures, setVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const clientId = "67d6da5ba6dcbf7c1c3b936c";

    useEffect(() => {
        const fetchClientAndVoitures = async () => {
            try {
                const clientRes = await axios.get(`http://e0oowcgs8kk0gkkoks84swso.157.180.35.88.sslip.io/api/clients/${clientId}`);
                const voitureIds = clientRes.data.voitures || [];

                if (voitureIds.length === 0) {
                    setVoitures([]);
                    setLoading(false);
                    return;
                }

                const voiturePromises = voitureIds.map(id =>
                    axios.get(`http://e0oowcgs8kk0gkkoks84swso.157.180.35.88.sslip.io/api/voitures/${id}`).then(res => res.data)
                );

                const voituresData = await Promise.all(voiturePromises);
                setVoitures(voituresData);
            } catch (err) {
                console.error("Erreur API :", err);
                setError("Impossible de charger les données.");
            } finally {
                setLoading(false);
            }
        };

        fetchClientAndVoitures();
    }, []);

    return (
        <div>
            <Header />
            <div className="container">
                <h2>🚗 Liste des Voitures</h2>

                {loading && <p>Chargement des données...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && (
                    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Matriculation</th>
                                <th>Modèle</th>
                                <th>Nature</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voitures.length > 0 ? (
                                voitures.map((v) => (
                                    <tr key={v._id}>
                                        <td>{v.matriculation || "N/A"}</td>
                                        <td>{v.modele || "N/A"}</td>
                                        <td>{v.nature || "N/A"}</td>
                                        <td>
                                            <Link to={`/voiture/${v.gpsData._id}`} className="btn btn-primary">
                                                📍 Voir sur la carte
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>Aucune voiture trouvée</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
