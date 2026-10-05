type WaveDividerProps = {
  flip?: boolean; // true = flipped, use at the bottom of a section
  color?: string; // should match the section it "belongs" to
};

export default function WaveDivider({
  flip = false,
  color = "#ffffff",
}: WaveDividerProps) {
  return (
    <div className={flip ? "-scale-y-100" : ""}>
      <svg
        className="block h-15 w-full"
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0" y="50" width="1200" height="90" fill={color} />
        <path
          d="M0,40 C150,90 350,0 600,35 C850,70 1050,10 1200,45 L1200,90 L0,90 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
