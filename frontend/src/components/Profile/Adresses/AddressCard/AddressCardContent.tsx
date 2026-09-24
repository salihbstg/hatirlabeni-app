import React from "react";

import type { Address } from "../../../types/User";

import AddressCardFields from "./AddressCardFields";

interface AddressCardContentProps {
  address: Address;
  isEditing: boolean;
  onChange: (field: keyof Address, value: string) => void;
  onCityChange: (city: string) => void;
  onDistrictChange: (district: string) => void;
}

const AddressCardContent = ({
  address,
  isEditing,
  onChange,
  onCityChange,
  onDistrictChange,
}: AddressCardContentProps) => {
  return (
    <div className="flex flex-col gap-2 p-2.5 sm:p-3">
      {/* Açık Adres */}
      <section>
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-3 w-1 rounded-full bg-[#6B8F86]" />

          <h4 className="text-[11px] font-semibold text-[#3f493e]">
            Açık Adres
          </h4>
        </div>

        <AddressCardFields
          address={address}
          isEditing={isEditing}
          onChange={onChange}
          onCityChange={onCityChange}
          onDistrictChange={onDistrictChange}
        />
      </section>
    </div>
  );
};

export default AddressCardContent;