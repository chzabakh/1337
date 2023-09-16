import { ReactNode } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-between h-full max-h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
