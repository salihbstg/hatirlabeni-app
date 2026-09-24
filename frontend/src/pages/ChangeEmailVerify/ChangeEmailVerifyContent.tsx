import type { FC } from "react";

import {
  verificationTitles,
  verificationStatusMessages,
  verificationPageContent,
} from "./changeEmailVerify.constants";

type VerificationStatus = "loading" | "success" | "error";

interface ChangeEmailVerifyContentProps {
  status: VerificationStatus;
  message: string;
}

const ChangeEmailVerifyContent: FC<ChangeEmailVerifyContentProps> = ({
  status,
  message,
}) => {
  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const iconContainerClass = isSuccess
    ? "bg-green-50"
    : status === "error"
      ? "bg-red-50"
      : "bg-[#f5efe5]";

  const title = verificationTitles[status];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e8e3db] bg-white p-8 text-center shadow-sm">
        {/* Icon */}
        <div
          className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${iconContainerClass}`}
          aria-hidden="true"
        >
          {isLoading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e8e3db] border-t-[#9b7b50]" />
          ) : isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-2xl font-semibold text-[#3d352c]">
          {title}
        </h1>

        {/* Message */}
        <p
          role="status"
          aria-live="polite"
          className="mb-6 text-sm leading-6 text-[#81786d]"
        >
          {message}
        </p>

        {/* Loading Status */}
        {isLoading && (
          <div className="mb-6 rounded-xl border border-[#e8e3db] bg-[#faf9f6] p-4">
            <p className="text-sm text-[#6c5b45]">
              {verificationStatusMessages.loading}
            </p>
          </div>
        )}

        {/* Success Status */}
        {isSuccess && (
          <div className="mb-6 rounded-xl border border-green-100 bg-green-50 p-4">
            <p className="text-sm text-green-700">
              {verificationStatusMessages.success}
            </p>
          </div>
        )}

        {/* Action */}
        {!isLoading && (
          <a
            href="/"
            className="inline-block w-full rounded-xl bg-[#9b7b50] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#856640]"
          >
            {verificationPageContent.homeButton}
          </a>
        )}

        {/* Footer */}
        <p className="mt-6 text-xs text-[#a49a8e]">
          {verificationPageContent.footer}
        </p>
      </div>
    </div>
  );
};

export default ChangeEmailVerifyContent;