import type { Metadata } from "next";

// Login y registro no deben indexarse ni aparecer en buscadores.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
