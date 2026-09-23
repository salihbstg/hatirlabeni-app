import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    refresh,
    logout as logoutRequest,
} from "../api/AuthService";

import { isAccessTokenValid } from "../utils/Token";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Login: Token'ı kaydet ve oturumu aç
    const login = useCallback((accessToken: string) => {
        if (!accessToken) {
            console.error("Access token bulunamadı.");
            return;
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("sessionActive", "true");

        setIsAuthenticated(true);
    }, []);

    // Logout: Backend ve frontend oturumunu kapat
    const handleLogout = async () => {
        try {
            await logoutRequest();
        } catch (error) {
            console.error("Logout sırasında hata oluştu:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("sessionActive");

            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            const params = new URLSearchParams(window.location.search);
            const isGoogleLogin = params.get("googleLogin") === "success";

            try {
                // Google OAuth dönüşü
                if (isGoogleLogin) {
                    const response = await refresh();

                    if (!response?.accessToken) {
                        throw new Error("Google girişinden sonra access token alınamadı.");
                    }

                    login(response.accessToken);

                    // Google parametresini URL'den temizle
                    window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname
                    );

                    return;
                }

                // Kullanıcı logout yaptıysa refresh deneme
                if (!localStorage.getItem("sessionActive")) {
                    setIsAuthenticated(false);
                    return;
                }

                // Access token geçerliyse oturumu aç
                if (isAccessTokenValid()) {
                    setIsAuthenticated(true);
                    return;
                }

                // Access token geçersizse refresh token ile yenile
                const response = await refresh();

                if (response?.accessToken) {
                    login(response.accessToken);
                } else {
                    throw new Error("Access token alınamadı.");
                }
            } catch (error) {
                console.error("Oturum kontrolü başarısız:", error);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("sessionActive");

                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [login]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                isLoading,
                login,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};