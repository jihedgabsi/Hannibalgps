import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      // Le succès est géré dans le contexte d'authentification
    } catch (error) {
      // Gérer l'erreur si nécessaire
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4 p-md-5" style={{ maxWidth: "480px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Bienvenue</h2>
          <p className="text-muted">Connectez-vous à votre compte</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <div className="input-group">
              <span className="input-group-text">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <div className="input-group">
              <span className="input-group-text">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Se souvenir de moi
              </label>
            </div>
            <a href="#" className="text-decoration-none">Mot de passe oublié?</a>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mb-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
          
          <div className="text-center">
            <p className="text-muted">
              Vous n'avez pas de compte? <a href="#" className="text-decoration-none">S'inscrire</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;