import type { MeResponse } from "../../types/auth";

import ProfileDetails from "./ProfileDetails/ProfileDetails";
import Addresses from "./Adresses/Addresses";

interface ProfileContentProps {
  activeMenu: string | null;
  profile: MeResponse | null;
}

const sectionTitles: Record<string, string> = {
  profile: "Kişisel Bilgiler",
  orders: "Tüm Siparişlerim",
  favorites: "Favorilerim",
  reviews: "Değerlendirmelerim",
  addresses: "Adreslerim",
  coupons: "Kuponlarım",
  accountSettings: "Hesap Ayarları",
  messages: "Mesajlarım",
  nostalgicMemories: "Topluluk",
  requestsAndComplaints: "Talep ve Şikayetler",
  interfaceSettingsDescription: "Arayüz Ayarları",
};

const sectionDescriptions: Record<string, string> = {
  profile: "Kişisel bilgilerini görüntüle ve yönet.",
  orders: "Geçmiş siparişlerini ve alışverişlerini buradan takip edebilirsin.",
  favorites: "Beğendiğin ve daha sonra incelemek istediğin ürünler.",
  reviews: "Ürünler hakkında yaptığın değerlendirmeler.",
  addresses: "Teslimat adreslerini görüntüle ve düzenle.",
  coupons: "Sana özel fırsatları ve indirim kuponlarını keşfet.",
  accountSettings: "Hesap bilgilerini ve güvenlik tercihlerini yönet.",
  messages: "Mesajlarını ve bildirimlerini buradan takip edebilirsin.",
  nostalgicMemories: "Hatıralarını paylaş, topluluğun bir parçası ol.",
  requestsAndComplaints: "Talep ve şikayetlerini buradan takip edebilirsin.",
  interfaceSettingsDescription:
    "Kullanıcı deneyimini kendi tercihlerine göre düzenle.",
};

interface EmptySectionProps {
  title: string;
  description: string;
}

const EmptySection = ({ title, description }: EmptySectionProps) => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center px-4 py-8 text-center">
      {/* Decorative Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e9e0d1] bg-[#f7f2e8]">
        <svg
          className="h-5 w-5 text-[#a45f2a]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 3.75H14L19 8.75V19A1.25 1.25 0 0 1 17.75 20.25H7A2 2 0 0 1 5 18.25V5.75A2 2 0 0 1 7 3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          <path
            d="M13.5 4V9H18.5M8.5 13H15.5M8.5 16.5H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a45f2a]">
        HatırlaBeni
      </span>

      <h3 className="text-base font-semibold tracking-tight text-[#3f493e] sm:text-lg">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-[#918878]">
        {description}
      </p>

      <div className="mt-5 h-px w-10 bg-[#d8c5aa]" />
    </div>
  );
};

const ProfileContent = ({
  activeMenu,
  profile,
}: ProfileContentProps) => {
  const title = activeMenu
    ? sectionTitles[activeMenu]
    : "Hesabım";

  const description = activeMenu
    ? sectionDescriptions[activeMenu]
    : "Hesap işlemlerini buradan yönetebilirsin.";

  const isKnownSection = activeMenu
    ? activeMenu in sectionTitles
    : false;

  return (
    <section
      aria-label="Profil içeriği"
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#e8e0d2] bg-[#fffdf8] shadow-[0_6px_24px_rgba(63,52,35,0.04)] md:h-[calc(100vh-140px)]"
    >
      {/* ================= HEADER ================= */}
      <div className="relative shrink-0 overflow-hidden border-b border-[#eee7da] bg-[#f7f3ea] px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-[#e8d6b9]/25"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-8 h-14 w-14 rounded-full border border-[#d9c4a5]/30"
        />

        <div className="relative">
          {/* Eyebrow */}
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-5 bg-[#a45f2a]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a45f2a]">
              Kişisel Alanın
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold tracking-tight text-[#3f493e] sm:text-xl">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#928878]">
            {description}
          </p>
        </div>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 lg:p-5">
        <div className="min-w-0">
          {/* Profile */}
          {activeMenu === "profile" && profile && (
            <ProfileDetails profile={profile} />
          )}

          {/* Addresses */}
          {activeMenu === "addresses" && <Addresses />}

          {/* Orders */}
          {activeMenu === "orders" && (
            <EmptySection
              title="Siparişlerin burada"
              description="Verdiğin siparişleri ve alışveriş geçmişini bu alandan takip edebileceksin."
            />
          )}

          {/* Favorites */}
          {activeMenu === "favorites" && (
            <EmptySection
              title="Favorilerin seni bekliyor"
              description="Beğendiğin ürünleri daha sonra kolayca bulmak için favorilerine ekleyebilirsin."
            />
          )}

          {/* Reviews */}
          {activeMenu === "reviews" && (
            <EmptySection
              title="Değerlendirmelerin"
              description="Yaptığın ürün değerlendirmeleri bu alanda görüntülenecek."
            />
          )}

          {/* Coupons */}
          {activeMenu === "coupons" && (
            <EmptySection
              title="Sana özel fırsatlar"
              description="Kullanabileceğin indirim kuponlarını bu alanda görüntüleyebilirsin."
            />
          )}

          {/* Account Settings */}
          {activeMenu === "accountSettings" && (
            <EmptySection
              title="Hesap ayarların"
              description="Hesabınla ilgili tercihlerini ve güvenlik ayarlarını buradan yönetebileceksin."
            />
          )}

          {/* Messages */}
          {activeMenu === "messages" && (
            <EmptySection
              title="Mesajların"
              description="Mesajların ve bildirimlerin bu alanda yer alacak."
            />
          )}

          {/* Community */}
          {activeMenu === "nostalgicMemories" && (
            <EmptySection
              title="Hatıralarını paylaş"
              description="Nostaljik anılarını paylaşabileceğin topluluk alanı burada seni bekliyor."
            />
          )}

          {/* Requests and Complaints */}
          {activeMenu === "requestsAndComplaints" && (
            <EmptySection
              title="Talep ve şikayetlerin"
              description="Destek taleplerini ve şikayetlerini bu alandan takip edebileceksin."
            />
          )}

          {/* Interface Settings */}
          {activeMenu === "interfaceSettingsDescription" && (
            <EmptySection
              title="Arayüz tercihlerin"
              description="HatırlaBeni deneyimini kişisel tercihlerine göre düzenleyebileceğin alan."
            />
          )}

          {/* Unknown Section */}
          {activeMenu && !isKnownSection && (
            <EmptySection
              title="İçerik bulunamadı"
              description="Görüntülemek istediğin hesap alanı mevcut değil."
            />
          )}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="shrink-0 border-t border-[#eee7da] bg-[#fcfaf5] px-4 py-3">
        <p className="text-center text-[9px] tracking-wide text-[#a49a88]">
          Geçmişten bugüne, her anı sakla.
        </p>
      </div>
    </section>
  );
};

export default ProfileContent;