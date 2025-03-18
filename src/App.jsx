import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VoitureDetails from "./pages/VoitureDetails";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/voiture/:id" element={<VoitureDetails />} /> {/* 🔥 Nouvelle route */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
