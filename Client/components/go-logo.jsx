export function GoLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Background circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#123845] to-[#0A1F2E] rounded-lg"></div>
        {/* GO text */}
        <span className="relative text-white font-black text-base tracking-tighter leading-none">GO</span>
        {/* Gold accent dot */}
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
      </div>
    </div>
  )
}
