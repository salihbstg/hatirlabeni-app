export interface ProfileMenuItem {
  id: string;
  title: string;
  description: string;
}

export const profileMenuItems: ProfileMenuItem[] = [
  {
    id: "orders",
    title: "Tüm siparişlerim",
    description: "Tüm siparişlerinizi görüntüleyin.",
  },
  {
    id: "profile",
    title: "Profil",
    description: "Hesap bilgilerinizi yönetin.",
  },
  {
    id: "favorites",
    title: "Favorilerim",
    description: "Favorilerinizi görüntüleyin.",
  },
  {
    id: "reviews",
    title: "Değerlendirmelerim",
    description: "Puanlama ve yorumlarınızı görüntüleyin.",
  },
  {
    id: "addresses",
    title: "Adreslerim",
    description: "Kayıtlı adreslerinizi yönetin.",
  },
  {
    id: "accountSettings",
    title: "Hesap Ayarları",
    description: "Hesap ve güvenlik ayarları.",
  },
  {
    id: "messages",
    title: "Mesajlarım",
    description: "Mesajlarınızı görüntüleyin ve yanıtlayın.",
  },
  {
    id: "requestsAndComplaints",
    title: "Talep ve şikayet",
    description: "Talep ve şikayetlerinizi bizlere bildirebilirsiniz.",
  },
];