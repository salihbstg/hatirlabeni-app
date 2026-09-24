interface MobileCategorySectionProps {
  // Dönemlere göre gruplandırılmış kategori listesi.
  categories: Record<string, string[]>;

  // Şu anda açık olan dönem.
  selectedEra: string | null;

  // Dönem açma / kapatma işlemini parent component yönetir.
  onEraToggle: (era: string) => void;

  // Kategoriye tıklandığında çalışır.
  onCategoryClick: () => void;
}

const MobileCategorySection = ({
  categories,
  selectedEra,
  onEraToggle,
  onCategoryClick,
}: MobileCategorySectionProps) => {
  return (
    <div className="mb-2 border-b border-black/10 pb-2">
      {/* Dönemleri listele */}
      {Object.entries(categories).map(([era, eraCategories]) => {
        const isEraOpen = selectedEra === era;

        return (
          <div key={era}>
            {/* Dönem açma / kapatma butonu */}
            <button
              type="button"
              onClick={() => onEraToggle(era)}
              aria-expanded={isEraOpen}
              className="group flex w-full items-center justify-between
                rounded-lg px-4 py-3 text-left font-bold
                transition-colors duration-200
                hover:bg-black/[0.06]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <span>{era}</span>

              {/* Dönem açıkken ok işaretini döndür */}
              <span
                aria-hidden="true"
                className={`text-xs transition-transform duration-300 ${
                  isEraOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Seçili dönemin kategorilerini animasyonla göster */}
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isEraOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <div
                  className="ml-3 flex flex-col border-l
                    border-black/10 pb-1 pl-3"
                >
                  {eraCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={onCategoryClick}
                      className="rounded-lg px-3 py-2 text-left
                        text-sm font-normal
                        transition-all duration-200
                        hover:bg-black/[0.06] hover:pl-5
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-black/30"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileCategorySection;