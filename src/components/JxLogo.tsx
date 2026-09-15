export function JxLogo({ size = 18 }: { size?: number }) {
  return (
    <span
      className="w-9 h-9 rounded-xl grid place-items-center shrink-0"
      style={{ background: "linear-gradient(135deg,#04251a,#0a5238)" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 4 9l8 13 8-13-8-7Z" fill="#00D97E" />
        <path d="M12 2 4 9h16l-8-7Z" fill="#8bffd2" />
      </svg>
    </span>
  );
}
