interface ProfileMenuCardProps {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

const ProfileMenuCard = ({
  title,
  description,
  active,
  onClick,
}: ProfileMenuCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative flex w-full flex-col items-start
        px-4 py-3
        text-left text-[#2F302B]
        transition-all duration-200

        after:absolute
        after:right-0
        after:top-1/2
        after:h-0
        after:w-[3px]
        after:-translate-y-1/2
        after:bg-[#76513D]
        after:transition-all
        after:duration-300

        hover:bg-[#E7DED0]

        ${
          active
            ? "bg-[#D3C0AA] after:h-3/4"
            : "bg-[#E5EDE0]"
        }
      `}
    >
      <h2 className="text-sm font-semibold leading-5 text-[#2F302B]">
        {title}
      </h2>

      <p className="mt-0.5 text-[11px] leading-4 text-[#5F665B]">
        {description}
      </p>
    </button>
  );
};

export default ProfileMenuCard;