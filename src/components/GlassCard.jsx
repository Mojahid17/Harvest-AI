function GlassCard({ children }) {
  return (
    <div
      className="
      backdrop-blur-xl
      bg-white/10
      border border-white/10
      rounded-3xl
      shadow-2xl
      p-8
      "
    >
      {children}
    </div>
  );
}

export default GlassCard;