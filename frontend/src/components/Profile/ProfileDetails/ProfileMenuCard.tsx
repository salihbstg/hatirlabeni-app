import React from "react";

const ProfileMenuCard = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`
        group relative w-full
        flex flex-col items-start
        px-6 py-5
        text-left
        text-[#2F302B]
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


        ${props.active ? "bg-[#D3C0AA] after:h-3/4" : "bg-[#E5EDE0]"}
      `}
    >
      <h1 className="font-bold text-[16px] text-[#2F302B]">
        {props.title}
      </h1>

      <p className="mt-1 text-[12px] text-[#5F665B]">
        {props.description}
      </p>
    </button>
  );
};

export default ProfileMenuCard;