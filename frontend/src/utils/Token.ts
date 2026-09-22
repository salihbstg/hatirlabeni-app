import { jwtDecode } from "jwt-decode";

export const saveTokens = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("sessionActive", "true");
};

export const deleteTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

interface JwtPayload {
    exp: number;
}

export const isAccessTokenValid = (): boolean => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};