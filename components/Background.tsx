export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">

      <div className="hex-grid">

        {Array.from({ length: 90 }).map((_, i) => (
          <div
            key={i}
            className="hex animate-float"
            style={{
              animationDelay: `${(i % 10) * 0.4}s`,
            }}
          />
        ))}

      </div>

    </div>
  );
}