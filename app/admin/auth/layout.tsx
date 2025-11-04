import "@/css/satoshi.css";
import "@/css/style.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { AdminAuthProvider } from "../(with-layout)/admin-auth";

export const metadata: Metadata = {
  title: {
    template: "%s | Creaxy.me",
    default: "Creaxy.me",
  },
  description:
    "Creaxy.me",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <div className="flex min-h-screen">
            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <AdminAuthProvider>
                <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                  {children}
                </main>
              </AdminAuthProvider>
            </div>
          </div>
      </body>
    </html>
  );
}
