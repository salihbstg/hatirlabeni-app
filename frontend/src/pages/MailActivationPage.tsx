import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { verifyMail, me } from "../api/AuthService";

import ActivationLoading from "../components/Activation/ActivationLoading";
import ActivationResult from "../components/Activation/ActivationResult";

const ActivationPage = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alreadyActivated, setAlreadyActivated] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        // Önce JWT ile mevcut kullanıcının mail aktivasyon durumunu kontrol et.
        try {
          const response = await me();

          if (response.user.mailActivation) {
            setAlreadyActivated(true);
            return;
          }
        } catch {
          console.log(
            "Me isteği başarısız oldu, activation token ile devam ediliyor."
          );
        }

        // Mail aktif değilse activation token gerekli.
        if (!token) {
          setError(true);
          return;
        }

        await verifyMail({ token });

        console.log("Mail aktivasyonu başarılı.");
      } catch (error) {
        console.error("Mail aktivasyon hatası:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token]);

  if (loading) {
    return <ActivationLoading />;
  }

  if (alreadyActivated) {
    return <ActivationResult status="already-activated" />;
  }

  if (error) {
    return <ActivationResult status="error" />;
  }

  return <ActivationResult status="success" />;
};

export default ActivationPage;