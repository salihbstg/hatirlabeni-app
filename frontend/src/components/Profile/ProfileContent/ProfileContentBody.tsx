import type { MeResponse } from "../../../types/auth";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import Addresses from "../Adresses/Addresses";
import AccountSettings from "../AccountSettings/AccountSettings";

import EmptySection from "./EmptySection";

import {
  sectionTitles,
  unknownSectionTitle,
  unknownSectionDescription,
} from "./profileContent.constants";

interface ProfileContentBodyProps {
  activeMenu: string | null;
  profile: MeResponse | null;
}

const ProfileContentBody = ({
  activeMenu,
  profile,
}: ProfileContentBodyProps) => {
  const isKnownSection = activeMenu
    ? activeMenu in sectionTitles
    : false;

  return (
    <div className="min-w-0">
      {/* Kişisel Bilgiler */}
      {activeMenu === "profile" && profile && (
        <ProfileDetails profile={profile} />
      )}

      {/* Adreslerim */}
      {activeMenu === "addresses" && <Addresses />}

      {/* Hesap Ayarları */}
      {activeMenu === "accountSettings" && <AccountSettings />}

      {/* Siparişlerim */}
      {activeMenu === "orders" && (
        <EmptySection
          title="Siparişlerin burada"
          description="Verdiğin siparişleri ve alışveriş geçmişini bu alandan takip edebileceksin."
        />
      )}

      {/* Favorilerim */}
      {activeMenu === "favorites" && (
        <EmptySection
          title="Favorilerin seni bekliyor"
          description="Beğendiğin ürünleri daha sonra kolayca bulmak için favorilerine ekleyebilirsin."
        />
      )}

      {/* Değerlendirmelerim */}
      {activeMenu === "reviews" && (
        <EmptySection
          title="Değerlendirmelerin"
          description="Ürün değerlendirmelerin bu alanda görüntülenecek."
        />
      )}

      {/* Kuponlarım */}
      {activeMenu === "coupons" && (
        <EmptySection
          title="Sana özel fırsatlar"
          description="Kullanabileceğin indirim kuponlarını bu alanda görüntüleyebilirsin."
        />
      )}

      {/* Mesajlarım */}
      {activeMenu === "messages" && (
        <EmptySection
          title="Mesajların"
          description="Mesajların ve bildirimlerin bu alanda yer alacak."
        />
      )}

      {/* Topluluk */}
      {activeMenu === "nostalgicMemories" && (
        <EmptySection
          title="Hatıralarını paylaş"
          description="Nostaljik anılarını paylaşabileceğin topluluk alanı burada seni bekliyor."
        />
      )}

      {/* Talep ve Şikayetler */}
      {activeMenu === "requestsAndComplaints" && (
        <EmptySection
          title="Talep ve şikayetlerin"
          description="Destek taleplerini ve şikayetlerini bu alandan takip edebileceksin."
        />
      )}

      {/* Arayüz Ayarları */}
      {activeMenu === "interfaceSettingsDescription" && (
        <EmptySection
          title="Arayüz tercihlerin"
          description="HatırlaBeni deneyimini kişisel tercihlerine göre düzenleyebileceğin alan."
        />
      )}

      {/* Tanımlanmamış Menü */}
      {activeMenu && !isKnownSection && (
        <EmptySection
          title={unknownSectionTitle}
          description={unknownSectionDescription}
        />
      )}
    </div>
  );
};

export default ProfileContentBody;