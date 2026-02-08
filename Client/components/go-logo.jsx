export function GoLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Background — Secondary (Soft Deep Blue) */}
        <div className="absolute inset-0 bg-secondary rounded-lg"></div>
        {/* GO text — on dark: #FFFFFF */}
        <span className="relative text-secondary-foreground font-black text-base tracking-tighter leading-none">GO</span>
        {/* Accent dot — Soft Gold #F4C430 */}
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full"></div>
      </div>
    </div>
  )
}
