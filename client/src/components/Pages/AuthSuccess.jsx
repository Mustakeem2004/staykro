import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API_BASE_URL from "../../config/api";

/**
 * AuthSuccess component
 * This page is shown after successful OAuth redirect from the backend.
 * It calls fetchUser() to refresh the auth context and then redirects to home or admin panel.
 */
const AuthSuccess = () => {
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh user context immediately after OAuth success
    const refreshAndRedirect = async () => {
      try {
        await fetchUser(); // This will fetch the user from /api/auth/me using the JWT cookie
        // After successful fetch, the user will be logged in and role will be set
        // Redirect to home page or let App.jsx routing handle it
        navigate("/", { replace: true });
      } catch (err) {
        console.error("❌ Failed to fetch user after OAuth:", err);
        // If fetchUser fails, go back to login
        navigate("/login", { replace: true });
      }
    };

    refreshAndRedirect();
  }, [fetchUser, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Completing login...</h2>
      <p>Please wait while we finish setting up your account.</p>
    </div>
  );
};

export default AuthSuccess;
