import React from "react";

import type { Address } from "../../../../types/User";
import locations from "../../../../data/Locations";

import {
  inputClassName,
  detailCardClassName,
  labelClassName,
  valueClassName,
} from "./addressCard.styles";

interface AddressCardFieldsProps {
  address: Address;
  isEditing: boolean;
  onChange: (field: keyof Address, value: string) => void;
  onCityChange: (city: string) => void;
  onDistrictChange: (district: string) => void;
}

const AddressCardFields = ({
  address,
  isEditing,
  onChange,
  onCityChange,
  onDistrictChange,
}: AddressCardFieldsProps) => {
  // Seçili şehrin ilçelerini getir
  const selectedCity = locations[address.city as keyof typeof locations];

  const districts = selectedCity
    ? Object.keys(selectedCity.ilceler)
    : [];

  // Seçili ilçenin mahallelerini getir
  const neighborhoods =
    selectedCity?.ilceler[
      address.district as keyof typeof selectedCity.ilceler
    ] ?? [];

  // Posta kodu 5 rakamdan oluşmalı
  const isPostalCodeValid = /^\d{5}$/.test(address.postalCode);

  return (
    <div className="space-y-3">
      {/* Açık Adres */}
      {isEditing ? (
        <textarea
          value={address.addressLine}
          onChange={(event) =>
            onChange("addressLine", event.target.value)
          }
          rows={2}
          aria-label="Açık adres"
          placeholder="Açık adresinizi girin"
          className={`${inputClassName} resize-y leading-5`}
        />
      ) : (
        <div className="rounded-md border border-[#eee9e0] bg-[#faf9f6] px-3 py-2">
          <p className="break-words text-sm leading-5 text-[#343b35] [overflow-wrap:anywhere]">
            {address.addressLine || "-"}
          </p>
        </div>
      )}

      {/* Konum Bilgileri */}
      <section>
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="h-3 w-1 rounded-full bg-[#6B8F86]" />

          <h4 className="text-[11px] font-semibold text-[#3f493e]">
            Konum Bilgileri
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {/* Şehir */}
          <div className={detailCardClassName}>
            <label className={labelClassName}>Şehir</label>

            {isEditing ? (
              <select
                value={address.city}
                onChange={(event) =>
                  onCityChange(event.target.value)
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
            <label className={labelClassName}>İlçe</label>

            {isEditing ? (
              <select
                value={address.district}
                onChange={(event) =>
                  onDistrictChange(event.target.value)
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
            <label className={labelClassName}>Mahalle</label>

            {isEditing ? (
              <select
                value={address.neighborhood}
                onChange={(event) =>
                  onChange("neighborhood", event.target.value)
                }
                disabled={!address.district}
                aria-label="Mahalle seçin"
                className={inputClassName}
              >
                <option value="">Mahalle seçin</option>

                {neighborhoods.map((neighborhood) => (
                  <option key={neighborhood} value={neighborhood}>
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
            <label className={labelClassName}>Posta Kodu</label>

            {isEditing ? (
              <>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={address.postalCode}
                  onChange={(event) => {
                    // Yalnızca rakam kabul et, en fazla 5 hane
                    const value = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 5);

                    onChange("postalCode", value);
                  }}
                  aria-label="Posta kodu"
                  aria-invalid={!isPostalCodeValid}
                  aria-describedby="postal-code-error"
                  placeholder="5 haneli posta kodu"
                  className={`${inputClassName} ${
                    !isPostalCodeValid
                      ? "border-red-400 focus:border-red-500"
                      : ""
                  }`}
                />

                {!isPostalCodeValid && (
                  <p
                    id="postal-code-error"
                    role="alert"
                    className="mt-1 text-[11px] leading-4 text-red-500"
                  >
                    Posta kodu 5 rakam olmalıdır.
                  </p>
                )}
              </>
            ) : (
              <span className={valueClassName}>
                {address.postalCode || "-"}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddressCardFields;