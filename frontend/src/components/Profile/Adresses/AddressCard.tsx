import React from "react";

import type { Address } from "../../../types/User";

import locations from "../../../data/Locations";

type AddressCardProps = {
  address: Address;
  isEditing: boolean;
  setAddresses: React.Dispatch<
    React.SetStateAction<Address[] | null>
  >;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

const AddressCard = ({
  address,
  isEditing,
  setAddresses,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: AddressCardProps) => {
  const selectedCity =
    locations[address.city as keyof typeof locations];

  const districts = selectedCity
    ? Object.keys(selectedCity.ilceler)
    : [];

  const neighborhoods =
    selectedCity?.ilceler[
      address.district as keyof typeof selectedCity.ilceler
    ] ?? [];

  // Genel adres alanlarını güncelle
  const handleChange = (
    field: keyof Address,
    value: string
  ) => {
    setAddresses((prev) => {
      if (!prev) return prev;

      return prev.map((item) =>
        item.id === address.id
          ? {
              ...item,
              [field]: value,
            }
          : item
      );
    });
  };

  // Şehir değiştiğinde ilçe ve mahalleyi sıfırla
  const handleCityChange = (city: string) => {
    setAddresses((prev) => {
      if (!prev) return prev;

      return prev.map((item) =>
        item.id === address.id
          ? {
              ...item,
              city,
              district: "",
              neighborhood: "",
            }
          : item
      );
    });
  };

  // İlçe değiştiğinde mahalleyi sıfırla
  const handleDistrictChange = (district: string) => {
    setAddresses((prev) => {
      if (!prev) return prev;

      return prev.map((item) =>
        item.id === address.id
          ? {
              ...item,
              district,
              neighborhood: "",
            }
          : item
      );
    });
  };

  const inputClassName = `
    w-full min-w-0
    rounded-lg
    border border-[#e5dfd4]
    bg-white
    px-3 py-2.5
    text-sm text-[#3f493e]
    outline-none
    transition-colors
    placeholder:text-gray-400
    focus:border-[#6B8F86]
    focus:ring-2 focus:ring-[#6B8F86]/15
    disabled:cursor-not-allowed
    disabled:bg-gray-100
  `;

  const detailCardClassName = `
    min-w-0
    rounded-lg
    border border-[#eee9e0]
    bg-[#faf9f6]
    px-3.5 py-3
    transition-colors
  `;

  const labelClassName = `
    mb-1.5
    block
    text-[11px]
    font-medium
    text-gray-500
  `;

  const valueClassName = `
    block
    break-words
    text-sm
    font-medium
    leading-5
    text-[#343b35]
    [overflow-wrap:anywhere]
  `;

  return (
    <article
      className="
        w-full min-w-0
        overflow-hidden
        rounded-xl
        border border-[#e8e2d8]
        bg-white
        shadow-sm
        transition-shadow duration-200
        hover:shadow-md
        navbar-font
      "
    >
      {/* ================= HEADER ================= */}
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
        {/* Address Title */}
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a49a88]">
            Kayıtlı Adres
          </span>

          {isEditing ? (
            <input
              type="text"
              value={address.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
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

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {isEditing ? (
            <>
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

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col gap-4 p-3.5 sm:gap-5 sm:p-4">
        {/* Açık Adres */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-[#6B8F86]" />

            <h4 className="text-xs font-semibold text-[#3f493e]">
              Açık Adres
            </h4>
          </div>

          {isEditing ? (
            <textarea
              value={address.addressLine}
              onChange={(e) =>
                handleChange("addressLine", e.target.value)
              }
              rows={3}
              aria-label="Açık adres"
              placeholder="Açık adresinizi girin"
              className={`
                ${inputClassName}
                resize-y
                leading-5
              `}
            />
          ) : (
            <div
              className="
                rounded-lg
                border border-[#eee9e0]
                bg-[#faf9f6]
                px-3.5 py-3
              "
            >
              <p className="break-words text-sm leading-5 text-[#343b35] [overflow-wrap:anywhere]">
                {address.addressLine || "-"}
              </p>
            </div>
          )}
        </section>

        {/* Konum Bilgileri */}
        <section>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-[#6B8F86]" />

            <h4 className="text-xs font-semibold text-[#3f493e]">
              Konum Bilgileri
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {/* Şehir */}
            <div className={detailCardClassName}>
              <label className={labelClassName}>
                Şehir
              </label>

              {isEditing ? (
                <select
                  value={address.city}
                  onChange={(e) =>
                    handleCityChange(e.target.value)
                  }
                  aria-label="Şehir seçin"
                  className={inputClassName}
                >
                  <option value="">Şehir seçin</option>

                  {Object.keys(locations).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={valueClassName}>
                  {address.city || "-"}
                </span>
              )}
            </div>

            {/* İlçe */}
            <div className={detailCardClassName}>
              <label className={labelClassName}>
                İlçe
              </label>

              {isEditing ? (
                <select
                  value={address.district}
                  onChange={(e) =>
                    handleDistrictChange(e.target.value)
                  }
                  disabled={!address.city}
                  aria-label="İlçe seçin"
                  className={inputClassName}
                >
                  <option value="">İlçe seçin</option>

                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={valueClassName}>
                  {address.district || "-"}
                </span>
              )}
            </div>

            {/* Mahalle */}
            <div className={detailCardClassName}>
              <label className={labelClassName}>
                Mahalle
              </label>

              {isEditing ? (
                <select
                  value={address.neighborhood}
                  onChange={(e) =>
                    handleChange(
                      "neighborhood",
                      e.target.value
                    )
                  }
                  disabled={!address.district}
                  aria-label="Mahalle seçin"
                  className={inputClassName}
                >
                  <option value="">Mahalle seçin</option>

                  {neighborhoods.map((neighborhood) => (
                    <option
                      key={neighborhood}
                      value={neighborhood}
                    >
                      {neighborhood}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={valueClassName}>
                  {address.neighborhood || "-"}
                </span>
              )}
            </div>

            {/* Posta Kodu */}
            <div className={detailCardClassName}>
              <label className={labelClassName}>
                Posta Kodu
              </label>

              {isEditing ? (
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={address.postalCode}
                  onChange={(e) =>
                    handleChange(
                      "postalCode",
                      e.target.value
                    )
                  }
                  aria-label="Posta kodu"
                  placeholder="5 haneli posta kodu"
                  className={inputClassName}
                />
              ) : (
                <span className={valueClassName}>
                  {address.postalCode || "-"}
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default AddressCard;