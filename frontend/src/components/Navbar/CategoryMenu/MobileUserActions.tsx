import mobileMenuCart from "../../../assets/Navbar/MobileMenuCart.png";
import navbarProfileIcon from "../../../assets/Navbar/NavbarProfileIcon.png";
import avatar from "../../../assets/Navbar/Avatar.png";
import email from "../../../assets/Navbar/email.png";
import logout from "../../../assets/Navbar/logout.png";
import OrdersMe from "../../../assets/Navbar/OrdersMe.png";
import setting from "../../../assets/Navbar/setting.png";

interface MobileUserActionsProps {
  isAuthenticated: boolean;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

// Menüdeki tüm kullanıcı işlem butonlarında ortak kullanılan stiller.
const actionButtonClass = `
  group flex w-full items-center gap-3
  rounded-lg px-4 py-3 text-left
  transition-all duration-200
  hover:bg-black/[0.06] hover:pl-5
`;

// İşlem ikonlarının ortak boyut ve hover animasyonu.
const actionIconClass = `
  w-5 transition-transform duration-200
  group-hover:scale-110
`;

const MobileUserActions = ({
  isAuthenticated,
  onNavigate,
  onLogout,
}: MobileUserActionsProps) => {
  // Kullanıcı giriş yapmamışsa yalnızca giriş / kayıt ol seçeneğini göster.
  if (!isAuthenticated) {
    return (
      <div>
        <button
          type="button"
          onClick={() => onNavigate("/login")}
          className={`${actionButtonClass} font-bold`}
        >
          <img
            src={avatar}
            alt=""
            aria-hidden="true"
            className={actionIconClass}
          />

          <span>Giriş Yap / Kayıt Ol</span>
        </button>
      </div>
    );
  }

  // Giriş yapmış kullanıcıya ait menü seçenekleri.
  return (
    <div className="flex flex-col gap-1">
      {/* Kullanıcının sepetine yönlendirir. */}
      <button
        type="button"
        onClick={() => onNavigate("/cart")}
        className={actionButtonClass}
      >
        <img
          src={mobileMenuCart}
          alt=""
          aria-hidden="true"
          className={actionIconClass}
        />

        <span>Sepetim</span>
      </button>

      {/* Kullanıcının profil sayfasına yönlendirir. */}
      <button
        type="button"
        onClick={() => onNavigate("/profile")}
        className={actionButtonClass}
      >
        <img
          src={navbarProfileIcon}
          alt=""
          aria-hidden="true"
          className={actionIconClass}
        />

        <span>Hesabım</span>
      </button>

      {/* Kullanıcının siparişlerini görüntüler. */}
      <button
        type="button"
        onClick={() => onNavigate("/orders/me")}
        className={actionButtonClass}
      >
        <img
          src={OrdersMe}
          alt=""
          aria-hidden="true"
          className={actionIconClass}
        />

        <span>Tüm Siparişlerim</span>
      </button>

      {/* Hesap ayarları sayfasına yönlendirir. */}
      <button
        type="button"
        onClick={() => onNavigate("/settings")}
        className={actionButtonClass}
      >
        <img
          src={setting}
          alt=""
          aria-hidden="true"
          className={actionIconClass}
        />

        <span>Ayarlar</span>
      </button>

      {/* Kullanıcının mesajlarına yönlendirir. */}
      <button
        type="button"
        onClick={() => onNavigate("/messages/me")}
        className={actionButtonClass}
      >
        <img
          src={email}
          alt=""
          aria-hidden="true"
          className={actionIconClass}
        />

        <span>Mesajlarım</span>
      </button>

      {/* Oturum kapatma işlemini parent component'e iletir. */}
      <button
        type="button"
        onClick={onLogout}
        className={`${actionButtonClass}
          mt-1 border-t border-black/10 pt-4`}
      >
        <img
          src={logout}
          alt=""
          aria-hidden="true"
          className={actionIconClass}
        />

        <span>Çıkış Yap</span>
      </button>
    </div>
  );
};

export default MobileUserActions;