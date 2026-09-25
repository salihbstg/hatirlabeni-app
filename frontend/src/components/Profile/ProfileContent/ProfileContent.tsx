import type { MeResponse } from "../../../types/auth";

import ProfileContentHeader from "./ProfileContentHeader";
import ProfileContentBody from "./ProfileContentBody";
import ProfileContentFooter from "./ProfileContentFooter";

import {
  sectionTitles,
  sectionDescriptions,
  defaultSectionTitle,
  defaultSectionDescription,
} from "./profileContent.constants";

interface ProfileContentProps {
  activeMenu: string | null;
  profile: MeResponse | null;
}

const ProfileContent = ({
  activeMenu,
  profile,
}: ProfileContentProps) => {
  const title = activeMenu
    ? sectionTitles[activeMenu] ?? defaultSectionTitle
    : defaultSectionTitle;

  const description = activeMenu
    ? sectionDescriptions[activeMenu] ?? defaultSectionDescription
    : defaultSectionDescription;

  return (
    <section
      aria-label="Profil içeriği"
      className="
        flex
        min-h-0
        min-w-0
        flex-1
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#e8e0d2]
        bg-[#fffdf8]
        shadow-[0_6px_24px_rgba(63,52,35,0.04)]
        md:h-[calc(100vh-140px)]
      "
    >
      <ProfileContentHeader
        title={title}
        description={description}
      />

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <ProfileContentBody
          activeMenu={activeMenu}
          profile={profile}
        />
      </div>

      <ProfileContentFooter />
    </section>
  );
};

export default ProfileContent;