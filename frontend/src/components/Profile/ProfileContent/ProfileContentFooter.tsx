import { profileContentFooterText } from "./profileContent.constants";

const ProfileContentFooter = () => {
  return (
    <div className="shrink-0 border-t border-[#eee7da] bg-[#fcfaf5] px-4 py-3">
      <p className="text-center text-[9px] tracking-wide text-[#a49a88]">
        {profileContentFooterText}
      </p>
    </div>
  );
};

export default ProfileContentFooter;