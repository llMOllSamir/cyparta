import type { Metadata } from "next";
import "./globals.css";
import SideBar from "./components/SideBar";

export const metadata: Metadata = {
  title: "Cyparta",
  description: "This is Cyparta, a software development company with a talented team dedicated to crafting innovative solutions. Despite our short journey, we have already ...",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {


  return (
    <html lang="en">
      <body>
        <SideBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
