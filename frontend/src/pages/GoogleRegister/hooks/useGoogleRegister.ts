import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";

import {
    GOOGLE_REGISTER_API_URL,
    GOOGLE_REGISTER_MESSAGES,
    GOOGLE_REGISTER_VALIDATION_MESSAGES,
} from "../googleRegister.constants";

interface GoogleRegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    telephone: string;
    identityNumber: string;
    birthday: string;
}

interface GoogleRegisterInfoResponse {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
}

interface GoogleRegisterResponse {
    accessToken?: string;
}

interface GoogleRegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    telephone: string;
    identityNumber: string;
    birthday: string;
}

interface ApiErrorResponse {
    message?: string;
}

const INITIAL_FORM_DATA: GoogleRegisterFormData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    telephone: "",
    identityNumber: "",
    birthday: "",
};

const useGoogleRegister = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] =
        useState<GoogleRegisterFormData>(INITIAL_FORM_DATA);

    const [loading, setLoading] = useState(false);
    const [fetchingGoogleInfo, setFetchingGoogleInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // Google OAuth üzerinden gelen kullanıcı bilgilerini yükler.
    useEffect(() => {
        const fetchGoogleInfo = async () => {
            try {
                const response = await axios.get<GoogleRegisterInfoResponse>(
                    `${GOOGLE_REGISTER_API_URL}/auth/google/register-info`,
                    {
                        withCredentials: true,
                    },
                );

                setFormData((prev) => ({
                    ...prev,
                    firstName: response.data.firstName ?? "",
                    lastName: response.data.lastName ?? "",
                    email: response.data.email ?? "",
                }));
            } catch (error) {
                console.error("Google bilgileri alınamadı:", error);

                setErrorMessage(
                    GOOGLE_REGISTER_MESSAGES.googleInfoError,
                );
            } finally {
                setFetchingGoogleInfo(false);
            }
        };

        fetchGoogleInfo();
    }, []);

    // Form alanındaki değişiklikleri state'e aktarır.
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        [],
    );

    // Form verilerini API isteğinden önce doğrular.
    const validateForm = (): boolean => {
        if (!/^05\d{9}$/.test(formData.telephone)) {
            setErrorMessage(
                GOOGLE_REGISTER_VALIDATION_MESSAGES.telephone,
            );
            return false;
        }

        if (!/^\d{11}$/.test(formData.identityNumber)) {
            setErrorMessage(
                GOOGLE_REGISTER_VALIDATION_MESSAGES.identityNumber,
            );
            return false;
        }

        if (!formData.username.trim()) {
            setErrorMessage(
                GOOGLE_REGISTER_VALIDATION_MESSAGES.username,
            );
            return false;
        }

        return true;
    };

    // Google hesabı için kullanıcı kaydını tamamlar.
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setErrorMessage("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const requestBody: GoogleRegisterRequest = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username.trim(),
                telephone: formData.telephone,
                identityNumber: formData.identityNumber,
                birthday: formData.birthday,
            };

            const response =
                await axios.post<GoogleRegisterResponse>(
                    `${GOOGLE_REGISTER_API_URL}/auth/google/register`,
                    requestBody,
                    {
                        withCredentials: true,
                    },
                );

            const { accessToken } = response.data;

            // Access token alınmadan oturum başlatılmaz.
            if (!accessToken) {
                throw new Error(
                    GOOGLE_REGISTER_MESSAGES.missingAccessToken,
                );
            }

            login(accessToken);

            toast.success(
                GOOGLE_REGISTER_MESSAGES.registrationSuccess,
            );

            navigate("/", { replace: true });
        } catch (error: unknown) {
            console.error("Google kayıt hatası:", error);

            let message =
                GOOGLE_REGISTER_MESSAGES.registrationError;

            if (axios.isAxiosError<ApiErrorResponse>(error)) {
                message =
                    error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        fetchingGoogleInfo,
        errorMessage,
        handleChange,
        handleSubmit,
    };
};

export default useGoogleRegister;