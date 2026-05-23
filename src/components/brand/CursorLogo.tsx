type CursorLogoVariant = "lockup-horizontal" | "wordmark" | "cube";

type CursorLogoProps = {
  variant?: CursorLogoVariant;
  className?: string;
  priority?: boolean;
};

const logoConfig: Record<
  CursorLogoVariant,
  { light: string; dark: string; width: number; height: number; alt: string }
> = {
  "lockup-horizontal": {
    light: "/brand/cursor/lockup-horizontal-light.svg",
    dark: "/brand/cursor/lockup-horizontal-dark.svg",
    width: 132,
    height: 31,
    alt: "Cursor",
  },
  wordmark: {
    light: "/brand/cursor/wordmark-light.svg",
    dark: "/brand/cursor/wordmark-dark.svg",
    width: 96,
    height: 16,
    alt: "Cursor",
  },
  cube: {
    light: "/brand/cursor/cube-light.svg",
    dark: "/brand/cursor/cube-dark.svg",
    width: 28,
    height: 32,
    alt: "Cursor",
  },
};

export function CursorLogo({
  variant = "lockup-horizontal",
  className = "",
  priority = false,
}: CursorLogoProps) {
  const logo = logoConfig[variant];

  return (
    <span className={`inline-flex shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.light}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-auto scheme-light-only"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.dark}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-auto scheme-dark-only"
      />
    </span>
  );
}
