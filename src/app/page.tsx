import GateForm from "./_components/GateForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[100px]" />

      {/* Accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-blue-500/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-gray-400 tracking-widest uppercase">
            Free Course
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Smart Money
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Concept
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 mb-2 tracking-wide">
          〜機関投資家の思考の裏側〜
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto my-8" />

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-12 max-w-md mx-auto">
          マーケットを動かす本当のプレイヤーの視点を手に入れる。
          <br />
          全15章の無料講座で、SMCの本質を体系的に学ぶ。
        </p>

        {/* Gate: Discord ID verification */}
        <GateForm />
      </div>

      {/* Bottom decorative dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-gray-600"
          />
        ))}
      </div>
    </main>
  );
}
