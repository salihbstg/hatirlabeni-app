import React from "react";

interface DesktopCategoryListProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
}

const DesktopCategoryList: React.FC<DesktopCategoryListProps> = ({
  categories,
  onCategoryClick,
}) => {
  return (
    <div className="px-3 py-3">
      {/* Kategori listesi başlığı */}
      <div className="mb-2 flex items-center justify-between px-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Kategoriler
        </span>

        <span className="text-xs text-stone-400">
          {categories.length}
        </span>
      </div>

      {/* Döneme ait kategoriler */}
      <div className="space-y-1">
        {categories.map((category, index) => (
          <button
            key={`${category}-${index}`}
            type="button"
            onClick={() => onCategoryClick(category)}
            className="group flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition-colors duration-200 hover:bg-amber-100/60"
          >
            <div className="flex items-center gap-3">
              {/* Kategori sıra numarası */}
              <span className="w-5 text-xs tabular-nums text-stone-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Kategori adı */}
              <span className="text-sm text-stone-700 transition-colors group-hover:text-amber-900">
                {category}
              </span>
            </div>

            {/* Hover durumunda görünen ok */}
            <span className="translate-x-[-4px] text-stone-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesktopCategoryList;