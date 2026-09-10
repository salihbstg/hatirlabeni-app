import React, { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Profile/ProfileCard";

import { deleteTokens } from "../utils/Token";

import toast from "react-hot-toast";

import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeCard, setActiveCard] = useState("profile");

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#F4F1E8]">

      <Navbar />

      <div className="flex flex-1 min-h-0 overflow-hidden px-2 md:px-6 lg:px-8 pt-2 pb-5">

        {/* Sidebar */}
        <div className="hidden md:flex w-[28.571%] min-h-0 text-black border-e border-[#6B4733]">

          <div className="w-full min-h-0 overflow-y-auto bg-[#E5EDE0]">

            <ProfileCard
              title="Tüm siparişlerim"
              description="Tüm siparişlerinizi görüntüleyin."
              active={activeCard === "orders"}
              onClick={() => setActiveCard("orders")}
            />

            <ProfileCard
              title="Profil"
              description="Hesap bilgilerinizi yönetin."
              active={activeCard === "profile"}
              onClick={() => setActiveCard("profile")}
            />

            <ProfileCard
              title="Favorilerim"
              description="Favorilerinizi görüntüleyin."
              active={activeCard === "favorites"}
              onClick={() => setActiveCard("favorites")}
            />

            <ProfileCard
              title="Değerlendirmelerim"
              description="Puanlama ve yorumlarınızı görüntüleyin."
              active={activeCard === "reviews"}
              onClick={() => setActiveCard("reviews")}
            />

            <ProfileCard
              title="Adreslerim"
              description="Kayıtlı adreslerinizi yönetin."
              active={activeCard === "addresses"}
              onClick={() => setActiveCard("addresses")}
            />

            <ProfileCard
              title="Kuponlar"
              description="Kuponlarınızı kullanın."
              active={activeCard === "coupons"}
              onClick={() => setActiveCard("coupons")}
            />

            <ProfileCard
              title="Hesap Ayarları"
              description="Hesap ve güvenlik ayarları."
              active={activeCard === "accountSettings"}
              onClick={() => setActiveCard("accountSettings")}
            />

            <ProfileCard
              title="Mesajlarım"
              description="Mesajlarınızı görüntüleyin ve yanıtlayın."
              active={activeCard === "messages"}
              onClick={() => setActiveCard("messages")}
            />

            <ProfileCard
              title="Topluluk"
              description="Nostaljik anılarınızı kullanıcılarımız ile paylaşın."
              active={activeCard === "nostalgicMemories"}
              onClick={() => setActiveCard("nostalgicMemories")}
            />

            <ProfileCard
              title="Talep ve şikayet"
              description="Talep ve şikayetlerinizi bizlere bildirebilirsiniz."
              active={activeCard === "requestsAndComplaints"}
              onClick={() => setActiveCard("requestsAndComplaints")}
            />

            <ProfileCard
              title="Çıkış yap"
              description="Hesabınızdan çıkış yapın."
              active={activeCard === "logout"}
              onClick={() => {
                setActiveCard("logout");

                deleteTokens();

                setIsAuthenticated(false);

                toast.success("Çıkış yapıldı.");

                setTimeout(() => {
                  navigate("/");
                }, 400);
              }}
            />

          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-[71.429%] min-h-0 p-5 text-black bg-white border-y border-e border-[#6B4733] overflow-hidden">
          TEST2
        </div>

      </div>
    </div>
  );
};

export default Profile;