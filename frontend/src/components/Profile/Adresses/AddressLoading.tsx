import React from "react";

const AddressLoading: React.FC = () => {
  return (
    <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-gray-200 bg-white">
      <div
        className="flex items-center gap-3 text-sm text-gray-500"
        role="status"
        aria-live="polite"
      >
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-[#3F5B55] border-t-transparent"
          aria-hidden="true"
        />

        Adresler yükleniyor...
      </div>
    </div>
  );
};

export default AddressLoading;