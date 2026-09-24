import React from "react";
import DesktopCategoryList from "./DesktopCategoryList";

interface DesktopEraDropdownProps {
  era: string;
  categories: string[];
  isOpen: boolean;
  onCategoryClick: (category: string) => void;
  onClose: () => void;
}

const DesktopEraDropdown: React.FC<DesktopEraDropdownProps> = ({
  era,
  categories,
  isOpen,
  onCategoryClick,
  onClose,
}) => {
  // Dropdown kapalıysa içeriği render etme.
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-xl border border-stone-200 bg-[#FAF9F6] shadow-xl">
      {/* Dropdown header */}
      <div className="relative border-b border-stone-200 px-5 py-4">
        {/* Dekoratif arka plan */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full border-[10px] border-amber-900" />
        </div>

        <div className="relative">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-500">
            Hatıralara Yolculuk
          </p>

          <h3 className="text-lg font-semibold text-stone-800">
            {era}
          </h3>

          <p className="mt-1 text-xs text-stone-500">
            Bu dönemin izlerini keşfet
          </p>
        </div>
      </div>

      {/* Kategori listesi */}
      <DesktopCategoryList
        categories={categories}
        onCategoryClick={onCategoryClick}
      />

      {/* Dropdown footer */}
      <div className="flex items-center justify-between border-t border-stone-200 px-5 py-3">
        <span className="text-xs text-stone-500">
          {categories.length} kategori
        </span>

        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-stone-600 transition-colors hover:text-amber-800"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default DesktopEraDropdown;