import type { NavItemProps } from "@/utils/types";

export default function NavItem({
  name,
  species,
  id,
  onSelect,
  isSelected,
  isFavorite,
  onToggleFavorite,
}: NavItemProps) {
  return (
    <li
      className={`flex items-center justify-between border-b border-[#00000026] px-4 py-3 ${
        isSelected ? "bg-gray-100" : ""
      }`}
      onClick={() => onSelect(id)}
    >
      <div
        className="flex cursor-pointer flex-col items-start"
        onClick={() => onSelect(id)}
      >
        <span className="text-default font-bold text-textDark">{name}</span>
        <span className="text-defaultSmall text-textLight">{species}</span>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`ml-2 rounded p-2 ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
        >
          ★
        </button>
        <span className="cursor-pointer pr-2 font-extrabold">{">"}</span>
      </div>
    </li>
  );
}
