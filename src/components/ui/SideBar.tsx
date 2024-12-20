import { SidebarProps } from "@/utils/types";

export default function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside
      className={`h-screen overflow-y-auto border-r border-[#00000026] ${className}`}
    >
      <nav>
        <ul>{children}</ul>
      </nav>
    </aside>
  );
}
