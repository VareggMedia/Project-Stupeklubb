type WaveDividerProps = {
  flip?: boolean; // true = flipped, use at the bottom of a section
  color?: string; // should match the section it "belongs" to
};

// One smooth sine wave across a 1200×90 box: crest at x = 477, period 600.
const WIDTH = 1200;
const HEIGHT = 90;
const MIDLINE = 36.5;
const AMPLITUDE = 10;
const PERIOD = 600;
const CREST_X = 477;
const STEP = 10;

const points = Array.from({ length: WIDTH / STEP + 1 }, (_, i) => {
  const x = i * STEP;
  const y = MIDLINE - AMPLITUDE * Math.cos((2 * Math.PI * (x - CREST_X)) / PERIOD);
  return `${x},${y.toFixed(2)}`;
});
const WAVE_PATH = `M${points.join(" L")} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

export default function WaveDivider({
  flip = false,
  color = "#ffffff",
}: WaveDividerProps) {
  return (
    <div className={flip ? "-scale-y-100" : ""}>
      <svg
        className="block h-15 w-full"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={WAVE_PATH} fill={color} />
      </svg>
    </div>
  );
}
