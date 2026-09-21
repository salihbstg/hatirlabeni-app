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
                // Access token hâlâ geçerli mi?
                if (isAccessTokenValid()) {
                    setIsAuthenticated(true);
                    return;
                }

                // Access token geçersizse refresh token var mı?
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    setIsAuthenticated(false);
                    return;
                }

                // Refresh token ile yeni access token al
                const response = await refresh();

                localStorage.setItem(
                    "accessToken",
                    response.accessToken
                );

                if (response.refreshToken) {
                    localStorage.setItem(
                        "refreshToken",
                        response.refreshToken
                    );
                }

                setIsAuthenticated(true);

            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                setIsAuthenticated(false);

            } finally {
                // Auth kontrolü tamamlandı
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