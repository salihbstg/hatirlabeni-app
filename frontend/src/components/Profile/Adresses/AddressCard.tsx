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

  const handleChange = (
    field: keyof Address,
    value: string
  ) => {
    setAddresses((prev) => {
      if (!prev) {
        return prev;
      }

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

  const handleCityChange = (city: string) => {
    setAddresses((prev) => {
      if (!prev) {
        return prev;
      }

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

  const handleDistrictChange = (district: string) => {
    setAddresses((prev) => {
      if (!prev) {
        return prev;
      }

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

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/70 px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Adres
          </span>

          {isEditing ? (
            <input
              type="text"
              value={address.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-base font-semibold text-gray-800 outline-none transition focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10"
            />
          ) : (
            <span className="text-lg font-semibold text-gray-800">
              {address.title}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={onSave}
                className="rounded-lg bg-[#3F5B55] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#344C47]"
              >
                Kaydet
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
              >
                İptal
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onEdit}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-[#3F5B55]"
              >
                Düzenle
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Sil
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 p-6">

        {/* Açık Adres */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#6B8F86]" />

            <span className="text-sm font-semibold text-gray-700">
              Açık Adres
            </span>
          </div>

          {isEditing ? (
            <textarea
              value={address.addressLine}
              onChange={(e) =>
                handleChange(
                  "addressLine",
                  e.target.value
                )
              }
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition focus:border-[#3F5B55] focus:bg-white focus:ring-2 focus:ring-[#3F5B55]/10"
            />
          ) : (
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="text-sm font-medium leading-6 text-gray-800">
                {address.addressLine}
              </span>
            </div>
          )}
        </div>

        {/* Konum Bilgileri */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#6B8F86]" />

            <span className="text-sm font-semibold text-gray-700">
              Konum Bilgileri
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Şehir */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="mb-1 block text-xs font-medium text-gray-400">
                Şehir
              </span>

              {isEditing ? (
                <select
                  value={address.city}
                  onChange={(e) =>
                    handleCityChange(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10"
                >
                  <option value="">
                    Şehir seçin
                  </option>

                  {Object.keys(locations).map((city) => (
                    <option
                      key={city}
                      value={city}
                    >
                      {city}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-sm font-semibold text-gray-800">
                  {address.city}
                </span>
              )}
            </div>

            {/* İlçe */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="mb-1 block text-xs font-medium text-gray-400">
                İlçe
              </span>

              {isEditing ? (
                <select
                  value={address.district}
                  onChange={(e) =>
                    handleDistrictChange(
                      e.target.value
                    )
                  }
                  disabled={!address.city}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">
                    İlçe seçin
                  </option>

                  {districts.map((district) => (
                    <option
                      key={district}
                      value={district}
                    >
                      {district}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-sm font-semibold text-gray-800">
                  {address.district}
                </span>
              )}
            </div>

            {/* Mahalle */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="mb-1 block text-xs font-medium text-gray-400">
                Mahalle
              </span>

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
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">
                    Mahalle seçin
                  </option>

                  {neighborhoods.map(
                    (neighborhood) => (
                      <option
                        key={neighborhood}
                        value={neighborhood}
                      >
                        {neighborhood}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <span className="text-sm font-semibold text-gray-800">
                  {address.neighborhood}
                </span>
              )}
            </div>

            {/* Posta Kodu */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="mb-1 block text-xs font-medium text-gray-400">
                Posta Kodu
              </span>

              {isEditing ? (
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) =>
                    handleChange(
                      "postalCode",
                      e.target.value
                    )
                  }
                  maxLength={5}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-[#3F5B55] focus:ring-2 focus:ring-[#3F5B55]/10"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-800">
                  {address.postalCode}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;