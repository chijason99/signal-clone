import styles from '../src/styles/Button.module.css'

export default function SubmitButton() {
  return (
    <button type="submit" className={styles.btn}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="24.000000pt"
        height="24.000000pt"
        viewBox="0 0 24.000000 24.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M117 183 l-99 -36 63 -63 c35 -35 64 -62 66 -61 4 4 73 197 70 196
-1 0 -46 -16 -100 -36z m63 -12 c0 -5 -6 -24 -14 -42 -7 -19 -16 -43 -20 -53
-6 -18 -8 -18 -23 -3 -16 16 -15 19 6 48 l23 31 -31 -23 c-29 -21 -32 -22 -48
-6 -14 14 -14 17 -2 22 104 38 109 39 109 26z"
          />
        </g>
      </svg>
    </button>
  );
}
