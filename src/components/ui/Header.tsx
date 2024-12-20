import { Link, useNavigate } from "react-router";

export default function Header({ showBack = false }: { showBack?: boolean }) {
  const navigate = useNavigate();
  return (
    <header className="space-between flex bg-ravnBlack p-4 pl-8 text-default font-bold text-[#F2F2F2]">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mr-4 flex items-center text-[#F2F2F2] hover:text-textEmphasis"
          >
            <span className="text-xl">←</span>
          </button>
        )}
        <span>Ravn Rick & Morty Registry</span>
      </div>
      <ul className="absolute right-8 flex space-x-4">
        <li className="hidden sm:block">
          <Link to="/" className="text-[#F2F2F2] hover:text-textEmphasis">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className="text-[#F2F2F2] hover:text-textEmphasis"
          >
            Favorites
          </Link>
        </li>
      </ul>
    </header>
  );
}
