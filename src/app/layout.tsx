import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout";

export const metadata: Metadata = {
  title: "Ora Brasiliae Market Lab",
  description: "Sistema educacional de registro e auditoria operacional WIN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="main-layout">
          <Sidebar />
          <main className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
