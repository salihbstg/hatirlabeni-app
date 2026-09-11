import React, { useEffect, useState } from "react";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

import {
  getAddresses,
  deleteAddress,
  updateAddress,
} from "../../../api/UserService";

import type { Address } from "../../../types/User";

const Addresses = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAddresses();
      setAddresses(data);
    };

    fetchAddresses();
  }, []);

  const handleEdit = (id: number) => {
    setIsEditing(id);
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleSave = async (updatedAddress: Address) => {
    try {
      await updateAddress(
        updatedAddress.id,
        updatedAddress
      );

      const updatedAddresses = await getAddresses();

      setAddresses(updatedAddresses);

      setIsEditing(null);
    } catch (error) {
      console.error(
        "Adres güncellenemedi:",
        error
      );
    }
  };

  const handleAddAddress = (newAddress: Address) => {
    setAddresses((prev) => {
      if (!prev) {
        return [newAddress];
      }

      return [...prev, newAddress];
    });

    setIsAddingAddress(false);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu adresi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    await deleteAddress(id);

    setAddresses((prev) => {
      if (!prev) {
        return prev;
      }

      return prev.filter(
        (address) => address.id !== id
      );
    });
  };

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Adreslerim
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Kayıtlı adreslerinizi buradan yönetebilirsiniz.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddingAddress(!isAddingAddress)
          }
          className="rounded-xl bg-[#3F5B55] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#344C47]"
        >
          {isAddingAddress
            ? "İptal"
            : "+ Yeni Adres Ekle"}
        </button>
      </div>

      {/* Add Address */}
      {isAddingAddress && (
        <AddressForm
          onSave={handleAddAddress}
          onCancel={() =>
            setIsAddingAddress(false)
          }
        />
      )}

      {/* Address List */}
      <div className="space-y-4">
        {addresses?.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isEditing={
              isEditing === address.id
            }
            setAddresses={setAddresses}
            onEdit={() =>
              handleEdit(address.id)
            }
            onSave={() =>
              handleSave(address)
            }
            onCancel={handleCancel}
            onDelete={() =>
              handleDelete(address.id)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Addresses;