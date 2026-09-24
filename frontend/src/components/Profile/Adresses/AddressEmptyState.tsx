import React from "react";

const AddressEmptyState: React.FC = () => {
  return (
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
  );
};

export default AddressEmptyState;