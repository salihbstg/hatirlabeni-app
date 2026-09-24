import React from "react";

import type { Address } from "../../../../types/User";

import AddressCardHeader from "./AddressCardHeader";
import AddressCardContent from "./AddressCardContent";

interface AddressCardProps {
  address: Address;
  isEditing: boolean;
  setAddresses: React.Dispatch<
    React.SetStateAction<Address[] | null>
  >;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const AddressCard = ({
  address,
  isEditing,
  setAddresses,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: AddressCardProps) => {
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

  return (
    <article
      className={`
        w-full min-w-0
        overflow-hidden
        rounded-lg
        border border-[#e8e2d8]
        bg-white
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        transition-shadow duration-150
        hover:shadow-sm
        navbar-font
      `}
    >
      {/* Adres başlığı ve aksiyonlar */}
      <AddressCardHeader
        address={address}
        isEditing={isEditing}
        onChange={handleChange}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />

      {/* Adres ve konum bilgileri */}
      <AddressCardContent
        address={address}
        isEditing={isEditing}
        onChange={handleChange}
        onCityChange={handleCityChange}
        onDistrictChange={handleDistrictChange}
      />
    </article>
  );
};

export default AddressCard;