import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { verifyChangeMail } from "../../api/AuthService";

import ChangeEmailVerifyContent from "./ChangeEmailVerifyContent";

import {
  verificationMessages,
} from "./changeEmailVerify.constants";

type VerificationStatus = "loading" | "success" | "error";

const ChangeEmailVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerificationStatus>(
    token ? "loading" : "error",
  );

  const [message, setMessage] = useState(
    token
      ? verificationMessages.loading
      : verificationMessages.invalidToken,
  );

  const requestSent = useRef(false);

  useEffect(() => {
    if (!token || requestSent.current) return;

    requestSent.current = true;

    const verifyEmail = async (): Promise<void> => {
      try {
        await verifyChangeMail({ token });

        setStatus("success");
        setMessage(verificationMessages.success);
      } catch (error: unknown) {
        setStatus("error");

        if (axios.isAxiosError(error)) {
          setMessage(
            error.response?.data?.message ??
              verificationMessages.error,
          );
        } else {
          setMessage(verificationMessages.unexpectedError);
        }
      }
    };

    void verifyEmail();
  }, [token]);

  return (
    <ChangeEmailVerifyContent
      status={status}
      message={message}
    />
  );
};

export default ChangeEmailVerifyPage;