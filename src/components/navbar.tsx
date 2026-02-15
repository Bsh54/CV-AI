import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-[#00a99d]">
          CV IA DEMO
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-[#00a99d] font-medium">Accueil</Link>
          <Link to="/modeles" className="text-gray-600 hover:text-[#00a99d] font-medium">Créer un CV</Link>
        </nav>
      </div>
    </header>
  );
}
