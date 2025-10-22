import type { CSSProperties, FC, ReactNode } from "react";

interface ShinyTextProps {
  text?: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  children?: ReactNode;
}

export const ShinyText: FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  children,
}) => {
  const animationDuration = `${speed}s`;

  const textContent = text || children;

  return (
    <div
      className={`shiny-text-wrapper ${className}`}
      style={
        {
          "--animation-duration": animationDuration,
        } as CSSProperties
      }
    >
      <span className={`shiny-text ${disabled ? "disabled" : ""}`}>
        {textContent}
      </span>
      <style>{`
        .shiny-text-wrapper {
          display: inline-block;
          position: relative;
        }

        .shiny-text {
          background: linear-gradient(
            110deg,
            #9ca3af 45%,
            #e5e7eb 50%,
            #9ca3af 55%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine var(--animation-duration) linear infinite;
        }

        .shiny-text.disabled {
          animation: none;
          background: #ffffff;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
};

