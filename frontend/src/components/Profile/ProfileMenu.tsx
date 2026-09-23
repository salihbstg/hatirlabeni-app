import ProfileMenuCard from "./ProfileMenuCard";
import { profileMenuItems } from "../../data/ProfileMenuItems";

interface ProfileMenuProps {
  activeMenu: string | null;
  onMenuClick: (menu: string) => void;
  onLogout: () => void;
}

const ProfileMenu = ({
  activeMenu,
  onMenuClick,
  onLogout,
}: ProfileMenuProps) => {
  return (
    <>
      {/* ================= MOBILE MENU ================= */}
      <div className="w-full md:hidden">
        <div className="mb-4 px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f2a]">
            Hesabım
          </p>

          <h2 className="mt-1 text-xl font-semibold text-[#3f493e]">
            Hesap işlemleri
          </h2>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto
            pb-4 scrollbar-hide"
        >
          {profileMenuItems.map((item) => (
            <div
              key={item.id}
              className="w-[240px] shrink-0 snap-start"
            >
              <ProfileMenuCard
                title={item.title}
                description={item.description}
                active={activeMenu === item.id}
                onClick={() => onMenuClick(item.id)}
              />
            </div>
          ))}

          {/* Logout */}
          <div className="w-[240px] shrink-0 snap-start">
            <ProfileMenuCard
              title="Çıkış yap"
              description="Hesabınızdan güvenle çıkış yapın."
              active={false}
              onClick={onLogout}
            />
          </div>
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        aria-label="Profil menüsü"
        className="hidden min-h-0 w-full shrink-0 md:flex
          md:h-[calc(100vh-140px)] md:w-[32%]
          lg:w-[30%] xl:w-[28%]"
      >
        <div
          className="flex h-full min-h-0 w-full flex-col overflow-hidden
            rounded-[24px] border border-[#e8e0d2]
            bg-[#fffdf8]
            shadow-[0_8px_30px_rgba(63,52,35,0.055)]"
        >
          {/* ================= SIDEBAR HEADER ================= */}
          <div className="shrink-0 border-b border-[#eee7da] bg-[#f7f3ea] px-6 py-7 lg:px-7">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#a45f2a]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a45f2a]">
                Kişisel Alan
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-[#3f493e]">
              Hesabım
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#938a7a]">
              Profilini ve hesap ayarlarını buradan yönetebilirsin.
            </p>
          </div>

          {/* ================= SCROLLABLE MENU ITEMS ================= */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-4 lg:p-5">
            <p className="mb-3 shrink-0 px-3 pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#aaa08e]">
              Hesap menüsü
            </p>

            <div className="flex flex-col gap-2">
              {profileMenuItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl transition-colors duration-200 ${
                    activeMenu === item.id
                      ? "bg-[#edf1e8]"
                      : "hover:bg-[#f8f5ee]"
                  }`}
                >
                  <ProfileMenuCard
                    title={item.title}
                    description={item.description}
                    active={activeMenu === item.id}
                    onClick={() => onMenuClick(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= LOGOUT ================= */}
          <div className="mx-5 shrink-0 border-t border-[#eee7da] py-4">
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b4a091]">
              Oturum
            </p>

            <div className="rounded-xl transition-colors duration-200 hover:bg-[#fbefeb]">
              <ProfileMenuCard
                title="Çıkış yap"
                description="Hesabınızdan güvenle çıkış yapın."
                active={false}
                onClick={onLogout}
              />
            </div>
          </div>

          {/* ================= SIDEBAR FOOTER ================= */}
          <div className="shrink-0 border-t border-[#eee7da] bg-[#fcfaf5] px-5 py-4">
            <p className="text-center text-xs tracking-wide text-[#a49a88]">
              Geçmişten bugüne, her anı sakla.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProfileMenu;