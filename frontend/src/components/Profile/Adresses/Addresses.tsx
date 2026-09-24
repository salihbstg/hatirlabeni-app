import React, { useEffect, useState } from "react";

import AddressForm from "./AddressForm/AddressForm";
import AddressLoading from "./AddressLoading";
import AddressesList from "./AddressesList";
import AddressEmptyState from "./AddressEmptyState";

import {
  getAddresses,
  deleteAddress,
  updateAddress,
} from "../../../api/UserService";

import type { Address } from "../../../types/User";

const Addresses: React.FC = () => {
  // State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch addresses
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

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Edit address
  const handleEdit = (id: number) => {
    setIsEditing(id);
    setIsAddingAddress(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(null);
  };

  // Save updated address
  const handleSave = async (updatedAddress: Address) => {
    try {
      await updateAddress(updatedAddress.id, updatedAddress);

      await fetchAddresses();
      setIsEditing(null);
    } catch (error) {
      console.error("Adres güncellenemedi:", error);
    }
  };

  // Add new address
  const handleAddAddress = (newAddress: Address) => {
    setAddresses((prev) => (prev ? [...prev, newAddress] : [newAddress]));

    setIsAddingAddress(false);
  };

  // Delete address
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu adresi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    try {
      await deleteAddress(id);

      setAddresses((prev) =>
        prev ? prev.filter((address) => address.id !== id) : prev
      );
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
      {isLoading && <AddressLoading />}

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
      {!isLoading && !error && addresses?.length === 0 && (
        <AddressEmptyState />
      )}

      {/* Address List */}
      {!isLoading && !error && addresses && addresses.length > 0 && (
        <AddressesList
          addresses={addresses}
          isEditing={isEditing}
          setAddresses={setAddresses}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Addresses;