export default function Sidebar({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="overflow-y-auto border-r border-[#00000026]">
      <nav>
        <ul>{children}</ul>
      </nav>
    </aside>
  );
}
