import React, { useState } from "react";

import locations from "../../../data/Locations";
import { saveAddress } from "../../../api/UserService";

import type { Address } from "../../../types/User";

type AddressFormProps = {
  onSave: (address: Address) => void;
  onCancel: () => void;
};

const AddressForm = ({ onSave, onCancel }: AddressFormProps) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const selectedCity = locations[city as keyof typeof locations];

  const districts = selectedCity
    ? Object.keys(selectedCity.ilceler)
    : [];

  const neighborhoods =
    selectedCity?.ilceler[
      district as keyof typeof selectedCity.ilceler
    ] ?? [];

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
    setNeighborhood("");
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setNeighborhood("");
  };

  const showToast = (
    type: "success" | "error",
    message: string
  ) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !city ||
      !district ||
      !neighborhood ||
      !postalCode ||
      !addressLine
    ) {
      showToast(
        "error",
        "Lütfen tüm adres bilgilerini doldurun."
      );

      return;
    }

    try {
      setIsSaving(true);

      const newAddress = {
        title,
        city,
        district,
        neighborhood,
        postalCode,
        addressLine,
      };

      const savedAddress = await saveAddress(newAddress);

      showToast(
        "success",
        "Adres başarıyla kaydedildi."
      );

      onSave(savedAddress);
    } catch (error) {
      console.error("Adres kaydedilemedi:", error);

      showToast(
        "error",
        "Adres kaydedilirken bir hata oluştu."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Toast */}
      {toast && (
        <div
          className={`absolute right-4 top-4 z-50 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Başlık */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Yeni Adres Ekle
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Adres bilgilerinizi eksiksiz doldurun.
        </p>
      </div>

      <div className="space-y-5">
        {/* Adres Başlığı */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Adres Başlığı
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn. Ev, İş"
            className="w-full rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#6B8F86] focus:ring-4 focus:ring-emerald-50"
          />
        </div>

        {/* İl */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            İl
          </label>

          <select
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#6B8F86] focus:ring-4 focus:ring-emerald-50"
          >
            <option value="">İl seçiniz</option>

            {Object.keys(locations).map((cityName, index) => (
              <option
                key={`${cityName}-${index}`}
                value={cityName}
              >
                {cityName}
              </option>
            ))}
          </select>
        </div>

        {/* İlçe */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            İlçe
          </label>

          <select
            value={district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!city}
            className="w-full rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 text-sm text-gray-800 outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#6B8F86] focus:ring-4 focus:ring-emerald-50"
          >
            <option value="">İlçe seçiniz</option>

            {districts.map((districtName, index) => (
              <option
                key={`${districtName}-${index}`}
                value={districtName}
              >
                {districtName}
              </option>
            ))}
          </select>
        </div>

        {/* Mahalle */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Mahalle
          </label>

          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            disabled={!district}
            className="w-full rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 text-sm text-gray-800 outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#6B8F86] focus:ring-1 focus:ring-[#6B8F86]"
          >
            <option value="">Mahalle seçiniz</option>

            {neighborhoods.map((neighborhoodName, index) => (
              <option
                key={`${neighborhoodName}-${index}`}
                value={neighborhoodName}
              >
                {neighborhoodName}
              </option>
            ))}
          </select>
        </div>

        {/* Posta Kodu */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Posta Kodu
          </label>

          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Örn. 34710"
            maxLength={5}
            className="w-full rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#6B8F86] focus:ring-4 focus:ring-emerald-50"
          />
        </div>

        {/* Açık Adres */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Açık Adres
          </label>

          <textarea
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            placeholder="Sokak, bina no, daire no vb."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition focus:border-[#6B8F86] focus:ring-4 focus:ring-emerald-50"
          />
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            İptal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="rounded-xl bg-[#3F5B55] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#344C47] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Kaydediliyor..." : "Adresi Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;