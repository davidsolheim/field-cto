import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-[var(--header-height)] py-[var(--section-space)] ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
