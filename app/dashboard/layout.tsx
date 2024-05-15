import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drowser | Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
