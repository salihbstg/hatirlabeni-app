import React from "react";

import AddressCard from "./AddressCard/AddressCard";

import type { Address } from "../../../types/User";

interface AddressesListProps {
  addresses: Address[];
  isEditing: number | null;
  setAddresses: React.Dispatch<React.SetStateAction<Address[] | null>>;
  onEdit: (id: number) => void;
  onSave: (address: Address) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
}

const AddressesList: React.FC<AddressesListProps> = ({
  addresses,
  isEditing,
  setAddresses,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="w-full min-w-0 space-y-3">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          isEditing={isEditing === address.id}
          setAddresses={setAddresses}
          onEdit={() => onEdit(address.id)}
          onSave={() => onSave(address)}
          onCancel={onCancel}
          onDelete={() => onDelete(address.id)}
        />
      ))}
    </div>
  );
};

export default AddressesList;