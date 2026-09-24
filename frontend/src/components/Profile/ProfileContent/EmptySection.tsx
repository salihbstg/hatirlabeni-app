interface EmptySectionProps {
  title: string;
  description: string;
}

const EmptySection = ({
  title,
  description,
}: EmptySectionProps) => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center px-4 py-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e9e0d1] bg-[#f7f2e8]">
        <svg
          className="h-5 w-5 text-[#a45f2a]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 3.75H14L19 8.75V19A1.25 1.25 0 0 1 17.75 20.25H7A2 2 0 0 1 5 18.25V5.75A2 2 0 0 1 7 3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          <path
            d="M13.5 4V9H18.5M8.5 13H15.5M8.5 16.5H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a45f2a]">
        HatırlaBeni
      </span>

      <h3 className="text-base font-semibold tracking-tight text-[#3f493e] sm:text-lg">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-[#918878]">
        {description}
      </p>

      <div className="mt-5 h-px w-10 bg-[#d8c5aa]" />
    </div>
  );
};

export default EmptySection;