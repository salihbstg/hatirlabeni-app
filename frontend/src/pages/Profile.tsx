import { useContext, useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar/Navbar";
import ProfileMenu from "../components/Profile/ProfileMenu";
import ProfileContent from "../components/Profile/ProfileContent";

import type { MeResponse } from "../types/auth";

import { me } from "../api/AuthService";

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>("profile");

  const [profile, setProfile] = useState<MeResponse | null>(null);

  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const [profileError, setProfileError] = useState(false);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  // AuthContext kontrolü
  if (!auth) {
    throw new Error("Profile, AuthProvider içerisinde kullanılmalıdır.");
  }

  const {
    isAuthenticated,
    isLoading,
    handleLogout,
  } = auth;

  // Kullanıcı profil bilgilerini getirir.
  const fetchProfile = async () => {
    try {
      setIsProfileLoading(true);
      setProfileError(false);

      const data = await me();

      setProfile(data);
    } catch (error) {
      console.error("Profil bilgileri alınamadı:", error);

      setProfileError(true);
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Profil menüsü seçildiğinde kullanıcı bilgilerini getir.
  useEffect(() => {
    if (activeMenu === "profile" && isAuthenticated) {
      fetchProfile();
    }
  }, [activeMenu, isAuthenticated]);

  // Menü seçimini günceller.
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  // Kullanıcı oturumunu kapatır.
  const onLogout = async () => {
    await handleLogout();

    toast.success("Çıkış yapıldı.");

    navigate("/");
  };

  // AuthContext token kontrolünü tamamlamadan yönlendirme yapma.
  if (isLoading) {
    return null;
  }

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir.
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: "/profile" }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1E8]">
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row gap-3 md:gap-0 px-2 sm:px-4 md:px-6 lg:px-8 pt-2 pb-4 md:pb-5">
        {/* Mobil ve masaüstü profil menüsü */}
        <ProfileMenu
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
          onLogout={onLogout}
        />

        {/* Seçilen menünün içeriği */}
        <main className="w-full md:w-[70%] lg:w-[72%] min-h-0 md:ms-3">
          {isProfileLoading && activeMenu === "profile" ? (
            <div className="flex h-40 items-center justify-center text-sm text-gray-500">
              Profil bilgileri yükleniyor...
            </div>
          ) : profileError && activeMenu === "profile" ? (
            <div className="flex h-40 flex-col items-center justify-center gap-3 text-sm text-gray-600">
              <p>Profil bilgileri alınırken bir hata oluştu.</p>

              <button
                type="button"
                onClick={fetchProfile}
                className="rounded-lg bg-[#3F5B55] px-4 py-2 text-white transition hover:bg-[#344C47]"
              >
                Tekrar Dene
              </button>
            </div>
          ) : (
            <ProfileContent
              activeMenu={activeMenu}
              profile={profile}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;