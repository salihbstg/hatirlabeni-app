import { createContext, useEffect, useState } from "react";

import { refresh } from "../api/AuthService";
import { isAccessTokenValid } from "../utils/Token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const checkAuthentication = async () => {
        try {
            // Access token hâlâ geçerliyse oturumu aç
            if (isAccessTokenValid()) {
                setIsAuthenticated(true);
                return;
            }

            // Access token geçersizse cookie üzerinden refresh dene
            const response = await refresh();

            // Yeni access token'ı kaydet
            if (response?.accessToken) {
                localStorage.setItem(
                    "accessToken",
                    response.accessToken
                );

                setIsAuthenticated(true);
            } else {
                throw new Error("Access token alınamadı.");
            }

        } catch (error) {
            // Refresh başarısızsa oturumu kapat
            localStorage.removeItem("accessToken");
            setIsAuthenticated(false);

        } finally {
            setIsLoading(false);
        }
    };

    checkAuthentication();
}, []);

return (
    <AuthContext.Provider
        value={{
            isAuthenticated,
            setIsAuthenticated,
            isLoading,
        }}
    >
        {children}
    </AuthContext.Provider>
);

};
