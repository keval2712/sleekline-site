'use client';

// Progress indicator — shows which installation phase the user is in
interface ProgressIndicatorProps {
  stage: number;
  progress: number;
}

const STAGES = [
  { num: '01', label: 'ARCHITECTURAL SPACE' },
  { num: '02', label: 'SUSPENSION SYSTEM' },
  { num: '03', label: 'METAL FRAMEWORK' },
  { num: '04', label: 'CEILING SLATS' },
  { num: '05', label: 'EDGE FINISHING' },
  { num: '06', label: 'LIGHTING' },
  { num: '07', label: 'FINAL REVEAL' },
];

export default function ProgressIndicator({ stage, progress }: ProgressIndicatorProps) {
  const current = STAGES[stage] || STAGES[0];
  const showIndicator = progress > 0.02 && progress < 0.98;

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-2 pointer-events-none"
      style={{
        opacity: showIndicator ? 1 : 0,
        transform: `translateY(-50%) translateX(${showIndicator ? '0' : '12px'})`,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* Stage dots */}
      <div className="flex flex-col gap-1.5">
        {STAGES.map((s, i) => (
          <div
            key={s.num}
            className="flex items-center gap-2 justify-end"
          >
            <span
              className="text-[10px] font-medium tracking-widest transition-all duration-300"
              style={{
                color: i === stage ? '#c8a060' : 'rgba(255,255,255,0.3)',
                opacity: i === stage ? 1 : 0.6,
              }}
            >
              {i < stage ? '✓' : i === stage ? s.num : s.num}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === stage ? '8px' : '4px',
                height: i === stage ? '8px' : '4px',
                background: i < stage
                  ? '#c8a060'
                  : i === stage
                    ? '#c8a060'
                    : 'rgba(255,255,255,0.2)',
                boxShadow: i === stage ? '0 0 8px rgba(200,160,96,0.8)' : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Current stage label */}
      <div className="mt-2 text-right">
        <div
          className="text-[9px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          INSTALLATION
        </div>
        <div
          className="text-[11px] font-bold tracking-widest"
          style={{ color: '#c8a060' }}
        >
          {current.label}
        </div>
      </div>
    </div>
  );
}
