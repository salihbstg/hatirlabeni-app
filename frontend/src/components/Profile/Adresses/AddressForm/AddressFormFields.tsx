import React from "react";

import locations from "../../../../data/Locations";

import {
  inputClassName,
  labelClassName,
  errorInputClassName,
  errorMessageClassName,
  formGridClassName,
} from "./addressForm.styles";

type AddressField =
  | "title"
  | "city"
  | "district"
  | "neighborhood"
  | "postalCode"
  | "addressLine";

type FormErrors = Partial<Record<AddressField, string>>;

interface AddressFormFieldsProps {
  title: string;
  city: string;
  district: string;
  neighborhood: string;
  postalCode: string;
  addressLine: string;

  errors: FormErrors;
  isSubmitted: boolean;

  onTitleChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onNeighborhoodChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;
  onAddressLineChange: (value: string) => void;
}

const AddressFormFields: React.FC<AddressFormFieldsProps> = ({
  title,
  city,
  district,
  neighborhood,
  postalCode,
  addressLine,
  errors,
  isSubmitted,
  onTitleChange,
  onCityChange,
  onDistrictChange,
  onNeighborhoodChange,
  onPostalCodeChange,
  onAddressLineChange,
}) => {
  // Seçilen şehre ait ilçeler
  const selectedCity = locations[city as keyof typeof locations];

  const districts = selectedCity
    ? Object.keys(selectedCity.ilceler)
    : [];

  // Seçilen ilçeye ait mahalleler
  const neighborhoods =
    selectedCity?.ilceler[
      district as keyof typeof selectedCity.ilceler
    ] ?? [];

  // Hata durumuna göre input stillerini belirle
  const getInputClassName = (field: AddressField) =>
    `${inputClassName} ${errors[field] ? errorInputClassName : ""}`;

  // Alan altındaki hata mesajı
  const renderError = (field: AddressField) => {
    if (!errors[field]) return null;

    return (
      <p className={errorMessageClassName} role="alert">
        {errors[field]}
      </p>
    );
  };

  return (
    <div className="space-y-3.5">
      {/* Adres Başlığı */}
      <div>
        <label htmlFor="address-title" className={labelClassName}>
          Adres Başlığı
        </label>

        <input
          id="address-title"
          data-field="title"
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Örn. Ev, İş"
          className={`mt-1 ${getInputClassName("title")}`}
          aria-invalid={!!errors.title}
        />

        {renderError("title")}
      </div>

      {/* İl ve İlçe */}
      <div className={formGridClassName}>
        {/* İl */}
        <div>
          <label htmlFor="address-city" className={labelClassName}>
            İl
          </label>

          <select
            id="address-city"
            data-field="city"
            value={city}
            onChange={(event) => onCityChange(event.target.value)}
            className={`mt-1 ${getInputClassName("city")}`}
            aria-invalid={!!errors.city}
          >
            <option value="">İl seçiniz</option>

            {Object.keys(locations).map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>

          {renderError("city")}
        </div>

        {/* İlçe */}
        <div>
          <label htmlFor="address-district" className={labelClassName}>
            İlçe
          </label>

          <select
            id="address-district"
            data-field="district"
            value={district}
            onChange={(event) => onDistrictChange(event.target.value)}
            disabled={!city}
            className={`mt-1 ${getInputClassName("district")}`}
            aria-invalid={!!errors.district}
          >
            <option value="">İlçe seçiniz</option>

            {districts.map((districtName) => (
              <option key={districtName} value={districtName}>
                {districtName}
              </option>
            ))}
          </select>

          {renderError("district")}
        </div>
      </div>

      {/* Mahalle ve Posta Kodu */}
      <div className={formGridClassName}>
        {/* Mahalle */}
        <div>
          <label
            htmlFor="address-neighborhood"
            className={labelClassName}
          >
            Mahalle
          </label>

          <select
            id="address-neighborhood"
            data-field="neighborhood"
            value={neighborhood}
            onChange={(event) =>
              onNeighborhoodChange(event.target.value)
            }
            disabled={!district}
            className={`mt-1 ${getInputClassName("neighborhood")}`}
            aria-invalid={!!errors.neighborhood}
          >
            <option value="">Mahalle seçiniz</option>

            {neighborhoods.map((neighborhoodName) => (
              <option key={neighborhoodName} value={neighborhoodName}>
                {neighborhoodName}
              </option>
            ))}
          </select>

          {renderError("neighborhood")}
        </div>

        {/* Posta Kodu */}
        <div>
          <label
            htmlFor="address-postal-code"
            className={labelClassName}
          >
            Posta Kodu
          </label>

          <input
            id="address-postal-code"
            data-field="postalCode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={postalCode}
            onChange={(event) =>
              onPostalCodeChange(event.target.value)
            }
            placeholder="Örn. 01000"
            className={`mt-1 ${getInputClassName("postalCode")}`}
            aria-invalid={!!errors.postalCode}
            aria-describedby={
              errors.postalCode ? "postal-code-error" : undefined
            }
          />

          {errors.postalCode && (
            <p
              id="postal-code-error"
              className={errorMessageClassName}
              role="alert"
            >
              {errors.postalCode}
            </p>
          )}

          {!errors.postalCode &&
            isSubmitted &&
            /^\d{5}$/.test(postalCode) && (
              <p className="mt-1 text-xs text-green-600">
                Posta kodu geçerli.
              </p>
            )}
        </div>
      </div>

      {/* Açık Adres */}
      <div>
        <label htmlFor="address-line" className={labelClassName}>
          Açık Adres
        </label>

        <textarea
          id="address-line"
          data-field="addressLine"
          value={addressLine}
          onChange={(event) => onAddressLineChange(event.target.value)}
          placeholder="Sokak, bina no, daire no vb."
          rows={3}
          className={`mt-1 resize-y ${getInputClassName("addressLine")}`}
          aria-invalid={!!errors.addressLine}
        />

        {renderError("addressLine")}
      </div>
    </div>
  );
};

export default AddressFormFields;