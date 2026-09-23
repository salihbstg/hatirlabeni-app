import React, { useEffect, useState } from "react";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

import {
  getAddresses,
  deleteAddress,
  updateAddress,
} from "../../../api/UserService";

import type { Address } from "../../../types/User";

const Addresses: React.FC = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [addresses, setAddresses] = useState<Address[] | null>(null);

  const [isEditing, setIsEditing] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // Adresleri getir
  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAddresses();

      setAddresses(data);
    } catch (error) {
      console.error("Adresler yüklenemedi:", error);
      setError("Adresler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Adres düzenleme
  const handleEdit = (id: number) => {
    setIsEditing(id);
    setIsAddingAddress(false);
  };

  // Düzenlemeyi iptal et
  const handleCancel = () => {
    setIsEditing(null);
  };

  // Adres kaydetme
  const handleSave = async (updatedAddress: Address) => {
    try {
      await updateAddress(updatedAddress.id, updatedAddress);

      await fetchAddresses();

      setIsEditing(null);
    } catch (error) {
      console.error("Adres güncellenemedi:", error);
    }
  };

  // Yeni adres ekleme
  const handleAddAddress = (newAddress: Address) => {
    setAddresses((prev) => {
      if (!prev) {
        return [newAddress];
      }

      return [...prev, newAddress];
    });

    setIsAddingAddress(false);
  };

  // Adres silme
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu adresi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    try {
      await deleteAddress(id);

      setAddresses((prev) => {
        if (!prev) return prev;

        return prev.filter((address) => address.id !== id);
      });
    } catch (error) {
      console.error("Adres silinemedi:", error);
    }
  };

  return (
    <div className="w-full min-w-0 space-y-4 navbar-font">
      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={() => {
            setIsAddingAddress((prev) => !prev);
            setIsEditing(null);
          }}
          className="
            inline-flex
            w-full sm:w-auto
            items-center justify-center
            gap-2
            rounded-lg
            bg-[#3F5B55]
            px-4 py-2.5
            text-xs sm:text-sm
            font-medium
            text-white
            shadow-sm
            transition-colors
            hover:bg-[#344C47]
            focus:outline-none
            focus:ring-2
            focus:ring-[#3F5B55]/30
          "
        >
          {isAddingAddress ? (
            <>
              <span aria-hidden="true">×</span>
              Adres Eklemeden Vazgeç
            </>
          ) : (
            <>
              <span aria-hidden="true">+</span>
              Yeni Adres Ekle
            </>
          )}
        </button>
      </div>

      {/* Add Address Form */}
      {isAddingAddress && (
        <div className="rounded-xl border border-[#e8e0d2] bg-white p-3 shadow-sm sm:p-4">
          <AddressForm
            onSave={handleAddAddress}
            onCancel={() => setIsAddingAddress(false)}
          />
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#3F5B55] border-t-transparent" />
            Adresler yükleniyor...
          </div>
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-8 text-center">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchAddresses}
            className="rounded-lg bg-[#3F5B55] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#344C47]"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading &&
        !error &&
        addresses &&
        addresses.length === 0 && (
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-[#ded5c5] bg-[#fcfaf5] px-4 py-8 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#e9e0d1] bg-[#f7f2e8]">
              <svg
                className="h-5 w-5 text-[#a45f2a]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="text-sm font-semibold text-[#3f493e]">
              Henüz kayıtlı adresin yok
            </h3>

            <p className="mt-1 max-w-xs text-xs leading-5 text-gray-500">
              Siparişlerinde kullanmak için yeni bir adres ekleyebilirsin.
            </p>
          </div>
        )}

      {/* Address List */}
      {!isLoading && !error && addresses && addresses.length > 0 && (
        <div className="w-full min-w-0 space-y-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isEditing={isEditing === address.id}
              setAddresses={setAddresses}
              onEdit={() => handleEdit(address.id)}
              onSave={() => handleSave(address)}
              onCancel={handleCancel}
              onDelete={() => handleDelete(address.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;