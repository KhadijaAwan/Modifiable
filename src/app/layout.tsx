import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { UserProvider } from "@/components/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modifiable",
  description: "It is a CRUD based Nextjs application where we can perform all Create, Read, Update and Delete operations in Nextjs with MongoDB.",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
  keywords: ["CRUD in Nextjs", "Nextjs", "Api in nextjs", "crud"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
