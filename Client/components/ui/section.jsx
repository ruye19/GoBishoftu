export function Section({ children, className = "", ...props }) {
  return (
    <section className={["py-12", className].join(" ")} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
}) {
  const alignClasses =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";
  return (
    <div className={["mb-8", alignClasses, className].join(" ")}>
      {subtitle && (
        <div className="text-sm font-medium tracking-widest uppercase text-gold-light mb-2">
          {subtitle}
        </div>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
