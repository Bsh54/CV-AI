export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xl font-bold text-[#00a99d] uppercase tracking-tighter">
            CV IA DEMO
          </div>
          <p className="text-gray-500 text-sm max-w-md">
            Une démonstration de la puissance de l'IA pour la personnalisation stratégique de candidatures.
          </p>
          <div className="pt-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} PROJET DE DÉMONSTRATION
          </div>
        </div>
      </div>
    </footer>
  );
}
