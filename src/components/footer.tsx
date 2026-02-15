export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xl font-bold text-[#00a99d] uppercase tracking-tighter">
            CV-AI
          </div>
          <div className="pt-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
