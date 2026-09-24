import type { FC } from "react";

interface ProfileContentHeaderProps {
  title: string;
  description: string;
}

const ProfileContentHeader: FC<ProfileContentHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="shrink-0 border-b border-[#eee7da] bg-[#fcfaf5] px-5 py-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold tracking-wide text-[#5b4636]">
          {title}
        </h2>

        <p className="text-xs leading-relaxed text-[#a49a88]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProfileContentHeader;