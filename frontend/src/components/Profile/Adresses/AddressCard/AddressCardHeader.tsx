import React from "react";

import type { Address } from "../../../types/User";

import { inputClassName } from "./addressCard.styles";

interface AddressCardHeaderProps {
  address: Address;
  isEditing: boolean;
  onChange: (field: keyof Address, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const AddressCardHeader = ({
  address,
  isEditing,
  onChange,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: AddressCardHeaderProps) => {
  return (
    <div
      className="
        flex flex-col gap-3
        border-b border-[#eee8de]
        bg-[#fcfaf6]
        px-4 py-3.5
        sm:flex-row sm:items-center
        sm:justify-between
        sm:px-5
      "
    >
      {/* Adres başlığı */}
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a49a88]">
          Kayıtlı Adres
        </span>

        {isEditing ? (
          <input
            type="text"
            value={address.title}
            onChange={(event) =>
              onChange("title", event.target.value)
            }
            aria-label="Adres başlığı"
            placeholder="Adres başlığı"
            className={`
              ${inputClassName}
              max-w-sm
              font-semibold
            `}
          />
        ) : (
          <h3 className="break-words text-sm font-semibold leading-5 text-[#3f493e] sm:text-base">
            {address.title || "İsimsiz Adres"}
          </h3>
        )}
      </div>

      {/* Aksiyon butonları */}
      <div className="flex shrink-0 items-center gap-2">
        {isEditing ? (
          <>
            {/* Kaydet */}
            <button
              type="button"
              onClick={onSave}
              className="
                inline-flex flex-1 sm:flex-none
                items-center justify-center
                rounded-lg
                bg-[#3F5B55]
                px-4 py-2
                text-xs font-medium
                text-white
                transition-colors
                hover:bg-[#344C47]
                focus:outline-none
                focus:ring-2
                focus:ring-[#3F5B55]/30
              "
            >
              Kaydet
            </button>

            {/* İptal */}
            <button
              type="button"
              onClick={onCancel}
              className="
                inline-flex flex-1 sm:flex-none
                items-center justify-center
                rounded-lg
                border border-[#e5dfd4]
                bg-white
                px-4 py-2
                text-xs font-medium
                text-gray-600
                transition-colors
                hover:bg-[#f5f2ec]
                focus:outline-none
                focus:ring-2
                focus:ring-gray-200
              "
            >
              İptal
            </button>
          </>
        ) : (
          <>
            {/* Düzenle */}
            <button
              type="button"
              onClick={onEdit}
              aria-label={`${address.title} adresini düzenle`}
              className="
                inline-flex flex-1 sm:flex-none
                items-center justify-center
                gap-1.5
                rounded-lg
                border border-transparent
                px-3 py-2
                text-xs font-medium
                text-[#3F5B55]
                transition-colors
                hover:border-[#dce7e2]
                hover:bg-[#eef4f1]
                focus:outline-none
                focus:ring-2
                focus:ring-[#3F5B55]/20
              "
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 20H21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <path
                  d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Düzenle
            </button>

            {/* Sil */}
            <button
              type="button"
              onClick={onDelete}
              aria-label={`${address.title} adresini sil`}
              className="
                inline-flex flex-1 sm:flex-none
                items-center justify-center
                gap-1.5
                rounded-lg
                border border-transparent
                px-3 py-2
                text-xs font-medium
                text-red-500
                transition-colors
                hover:border-red-100
                hover:bg-red-50
                focus:outline-none
                focus:ring-2
                focus:ring-red-200
              "
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7H20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <path
                  d="M10 11V17M14 11V17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <path
                  d="M5.5 7L6.5 20H17.5L18.5 7M9 7V4H15V7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Sil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressCardHeader;