export default function Logo() {
  return (
    <div className="flex items-center gap-2 font-bold text-xl">
      <div className="w-8 h-8 rounded-lg  text-white flex items-center justify-center">
        <img src="/icon.png" alt="Logo" className="w-8 h-8" />
      </div>
      <span>Product Explorer</span>
    </div>
  );
}
