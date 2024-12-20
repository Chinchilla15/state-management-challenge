import type { NavItemProps } from "@/utils/types";

export default function NavItem({
  name,
  species,
  id,
  onSelect,
  isSelected,
}: NavItemProps) {
  return (
    <li
      className={`flex items-center justify-between border-b border-[#00000026] px-4 py-3 ${
        isSelected ? "bg-gray-100" : ""
      }`}
      onClick={() => onSelect(id)}
    >
      <a href="#" className="flex cursor-pointer flex-col items-start">
        <span className="text-default font-bold text-textDark">{name}</span>
        <span className="text-defaultSmall text-textLight">{species}</span>
      </a>
      <span className="cursor-pointer pr-2 font-extrabold">{">"}</span>
    </li>
  );
}
