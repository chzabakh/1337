import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SocketProvider } from "../components/socket_context";
import DashboardLayout from "@/components/Layout/dashboardLayout";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const shouldRenderSidebar = ![
    "/login",
    "/register",
    "/",
    "/about",
    "/contact",
    "/addInfos",
    "/404",
    "/activate",
  ].includes(pathname);

  return (
    <>
      {shouldRenderSidebar ? (
        <>
          <SocketProvider>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          </SocketProvider>
        </>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}
