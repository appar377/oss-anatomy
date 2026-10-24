import { useId } from "react";

export function LayersArt({
  symbol = "</>",
  large = false,
}: {
  symbol?: string;
  large?: boolean;
}) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 240 240"
      className={large ? "layers-art large" : "layers-art"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#315c7d" />
          <stop offset="1" stopColor="#102a48" />
        </linearGradient>
      </defs>
      <path
        d="M127 46 208 80 208 191 127 157Z"
        fill="#d7eafa"
        fillOpacity=".75"
        stroke="#83b6da"
        strokeWidth="2"
      />
      <path
        d="M95 62 176 96 176 207 95 173Z"
        fill="#c8e1f4"
        fillOpacity=".8"
        stroke="#9bc6e3"
        strokeWidth="2"
      />
      <path
        d="M61 78 144 113 144 224 61 189Z"
        fill={`url(#${gradientId})`}
        stroke="#75add3"
        strokeWidth="2"
      />
      <path
        d="m146 82 44 18m-44-2 44 18m-14 25 14 6m-14 9 14 6"
        stroke="#5e96c2"
        strokeWidth="5"
      />
      <path d="M140 31v27" stroke="#a6cee9" strokeWidth="1.5" />
      <circle cx="140" cy="29" r="8" fill="#ed725d" />
      <text
        x="82"
        y="124"
        fill="#fff"
        fontSize="44"
        fontFamily="monospace"
        transform="skewY(22)"
      >
        {symbol}
      </text>
    </svg>
  );
}
export function Logo() {
  return (
    <span className="brand-lockup">
      <svg viewBox="0 0 70 65" width="49" height="49" aria-hidden="true">
        <path
          d="m34 8 27 12v39L34 47V8Zm-16 6 27 12v36L18 50V14Z"
          fill="none"
          stroke="#3d76a8"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="m2 20 27 12v31L2 51Z" fill="#183956" />
        <path
          d="m13 35-5 4 5 8m8-9-5 12"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
        />
        <path
          d="m48 29 8 4m-8 4 8 4m-8 4 8 4m-24-13 7 3m-7 5 7 3"
          stroke="#3d76a8"
          strokeWidth="2"
        />
        <circle cx="29" cy="5" r="3" fill="#ed725d" />
      </svg>
      <span>
        <strong>OSS解剖学</strong>
        <small>コードをたどる。設計が見える。</small>
      </span>
    </span>
  );
}
