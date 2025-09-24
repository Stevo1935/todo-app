import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import Providers from "./components/providers";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";

const inter = Inter({ subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A TypeScript todo app with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="header">
             <Link href="/" className="header__link" aria-label="Todo App Home">
              <FaTasks /> Todo App
            </Link>
          </header>
          <main className="main">{children}</main>
          </Providers>
      </body>
    </html>
  );
}
