import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar/Navbar";

import ProfileMenuCard from "../components/Profile/ProfileDetails/ProfileMenuCard";

import ProfileDetails from "../components/Profile/ProfileDetails/ProfileDetails";

import { deleteTokens } from "../utils/Token";

import type { MeResponse } from "../types/Auth";

import { me } from "../api/AuthService";

import toast from "react-hot-toast";

import { Navigate, useNavigate } from "react-router-dom";
import Addresses from "../components/Profile/Adresses/Addresses";

const Profile = () => {
  const [activeCard, setActiveCard] = useState<string | null>("profile");
  const [activeMenu, setActiveMenu] = useState<string | null>("profile");

  const { isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [profile, setProfile] = useState<MeResponse | null>(null);

  const fetchProfile = async () => {
    try {
      const data = await me();
      setProfile(data);
    } catch (error) {
      console.error("Profil bilgileri alınamadı:", error);
    }
  };

  useEffect(() => {
    if (activeMenu === "profile") {
      fetchProfile();
    }
  }, [activeMenu]);

  const handleLogout = () => {
    deleteTokens();
    setIsAuthenticated(false);

    toast.success("Çıkış yapıldı.");

    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  const handleMenuClick = (menu: string) => {
    setActiveCard(menu);
    setActiveMenu(menu);
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1E8]">

      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row gap-3 md:gap-0 px-2 sm:px-4 md:px-6 lg:px-8 pt-2 pb-4 md:pb-5">

        {/* ================= MOBILE MENU ================= */}

        <div className="md:hidden w-full">
          <div className="flex gap-2 overflow-x-auto pb-2">

            <ProfileMenuCard
              title="Tüm siparişlerim"
              description="Tüm siparişlerinizi görüntüleyin."
              active={activeCard === "orders"}
              onClick={() => handleMenuClick("orders")}
            />

            <ProfileMenuCard
              title="Profil"
              description="Hesap bilgilerinizi yönetin."
              active={activeCard === "profile"}
              onClick={() => handleMenuClick("profile")}
            />

            <ProfileMenuCard
              title="Favorilerim"
              description="Favorilerinizi görüntüleyin."
              active={activeCard === "favorites"}
              onClick={() => handleMenuClick("favorites")}
            />

            <ProfileMenuCard
              title="Değerlendirmelerim"
              description="Puanlama ve yorumlarınızı görüntüleyin."
              active={activeCard === "reviews"}
              onClick={() => handleMenuClick("reviews")}
            />

            <ProfileMenuCard
              title="Adreslerim"
              description="Kayıtlı adreslerinizi yönetin."
              active={activeCard === "addresses"}
              onClick={() => handleMenuClick("addresses")}
            />

            <ProfileMenuCard
              title="Kuponlar"
              description="Kuponlarınızı kullanın."
              active={activeCard === "coupons"}
              onClick={() => handleMenuClick("coupons")}
            />

            <ProfileMenuCard
              title="Hesap Ayarları"
              description="Hesap ve güvenlik ayarları."
              active={activeCard === "accountSettings"}
              onClick={() => handleMenuClick("accountSettings")}
            />

            <ProfileMenuCard
              title="Mesajlarım"
              description="Mesajlarınızı görüntüleyin ve yanıtlayın."
              active={activeCard === "messages"}
              onClick={() => handleMenuClick("messages")}
            />

            <ProfileMenuCard
              title="Topluluk"
              description="Nostaljik anılarınızı kullanıcılarımız ile paylaşın."
              active={activeCard === "nostalgicMemories"}
              onClick={() => handleMenuClick("nostalgicMemories")}
            />

            <ProfileMenuCard
              title="Talep ve şikayet"
              description="Talep ve şikayetlerinizi bizlere bildirebilirsiniz."
              active={activeCard === "requestsAndComplaints"}
              onClick={() =>
                handleMenuClick("requestsAndComplaints")
              }
            />

            <ProfileMenuCard
              title="Arayüz"
              description="Site içi arayüz ayarlarını kontrol edebilirsiniz."
              active={activeCard === "interfaceSettingsDescription"}
              onClick={() =>
                handleMenuClick("interfaceSettingsDescription")
              }
            />

            <ProfileMenuCard
              title="Çıkış yap"
              description="Hesabınızdan çıkış yapın."
              active={activeCard === "logout"}
              onClick={() => {
                setActiveCard("logout");
                handleLogout();
              }}
            />

          </div>
        </div>

        {/* ================= DESKTOP SIDEBAR ================= */}

        <aside className="hidden md:flex w-full md:w-[30%] lg:w-[28%] min-h-0 text-black">

          <div className="w-full min-h-0 overflow-y-auto rounded-lg border border-[#6B4733] bg-[#E5EDE0] shadow-sm">

            <ProfileMenuCard
              title="Tüm siparişlerim"
              description="Tüm siparişlerinizi görüntüleyin."
              active={activeCard === "orders"}
              onClick={() => handleMenuClick("orders")}
            />

            <ProfileMenuCard
              title="Profil"
              description="Hesap bilgilerinizi yönetin."
              active={activeCard === "profile"}
              onClick={() => handleMenuClick("profile")}
            />

            <ProfileMenuCard
              title="Favorilerim"
              description="Favorilerinizi görüntüleyin."
              active={activeCard === "favorites"}
              onClick={() => handleMenuClick("favorites")}
            />

            <ProfileMenuCard
              title="Değerlendirmelerim"
              description="Puanlama ve yorumlarınızı görüntüleyin."
              active={activeCard === "reviews"}
              onClick={() => handleMenuClick("reviews")}
            />

            <ProfileMenuCard
              title="Adreslerim"
              description="Kayıtlı adreslerinizi yönetin."
              active={activeCard === "addresses"}
              onClick={() => handleMenuClick("addresses")}
            />

            <ProfileMenuCard
              title="Kuponlar"
              description="Kuponlarınızı kullanın."
              active={activeCard === "coupons"}
              onClick={() => handleMenuClick("coupons")}
            />

            <ProfileMenuCard
              title="Hesap Ayarları"
              description="Hesap ve güvenlik ayarları."
              active={activeCard === "accountSettings"}
              onClick={() => handleMenuClick("accountSettings")}
            />

            <ProfileMenuCard
              title="Mesajlarım"
              description="Mesajlarınızı görüntüleyin ve yanıtlayın."
              active={activeCard === "messages"}
              onClick={() => handleMenuClick("messages")}
            />

            <ProfileMenuCard
              title="Topluluk"
              description="Nostaljik anılarınızı kullanıcılarımız ile paylaşın."
              active={activeCard === "nostalgicMemories"}
              onClick={() =>
                handleMenuClick("nostalgicMemories")
              }
            />

            <ProfileMenuCard
              title="Talep ve şikayet"
              description="Talep ve şikayetlerinizi bizlere bildirebilirsiniz."
              active={activeCard === "requestsAndComplaints"}
              onClick={() =>
                handleMenuClick("requestsAndComplaints")
              }
            />

            <ProfileMenuCard
              title="Arayüz"
              description="Site içi arayüz ayarlarını kontrol edebilirsiniz."
              active={activeCard === "interfaceSettingsDescription"}
              onClick={() =>
                handleMenuClick("interfaceSettingsDescription")
              }
            />

            <ProfileMenuCard
              title="Çıkış yap"
              description="Hesabınızdan çıkış yapın."
              active={activeCard === "logout"}
              onClick={() => {
                setActiveCard("logout");
                handleLogout();
              }}
            />

          </div>
        </aside>

        {/* ================= CONTENT ================= */}

        <main className="w-full md:w-[70%] lg:w-[72%] min-h-0 md:ms-3">

          <div className="h-full min-h-[500px] overflow-y-auto rounded-lg border border-[#6B4733] bg-white p-3 sm:p-5 lg:p-7 shadow-sm">

            {activeMenu === "profile" && profile && (
              <ProfileDetails profile={profile} />
            )}

            {activeMenu === "profile" && !profile && (
              <div className="flex min-h-[300px] items-center justify-center text-gray-500">
                Profil bilgileri yükleniyor...
              </div>
            )}

            {activeMenu === "orders" && (
              <div className="text-xl font-semibold">
                {"Tüm siparişlerim"}
              </div>
            )}

            {activeMenu === "favorites" && (
              <div className="text-xl font-semibold">
                {"Favorilerim"}
              </div>
            )}

            {activeMenu === "reviews" && (
              <div className="text-xl font-semibold">
                {"Değerlendirmelerim"}
              </div>
            )}

            {activeMenu === "addresses" && (
              <div className="text-xl font-semibold">
                {<Addresses></Addresses>}
              </div>
            )}

            {activeMenu === "coupons" && (
              <div className="text-xl font-semibold">
                {"Kuponlar"}
              </div>
            )}

            {activeMenu === "accountSettings" && (
              <div className="text-xl font-semibold">
                {"Hesap Ayarları"}
              </div>
            )}

            {activeMenu === "messages" && (
              <div className="text-xl font-semibold">
                {"Mesajlarım"}
              </div>
            )}

            {activeMenu === "nostalgicMemories" && (
              <div className="text-xl font-semibold">
                {"Topluluk"}
              </div>
            )}

            {activeMenu === "requestsAndComplaints" && (
              <div className="text-xl font-semibold">
                {"Talep ve şikayet"}
              </div>
            )}

            {activeMenu === "interfaceSettingsDescription" && (
              <div className="text-xl font-semibold">
                {"Arayüz"}
              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
};

export default Profile;