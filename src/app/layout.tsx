import "../../public/bootstrap/bootstrap.min.css";
import "@/assets/css/navbar.css";
import Footer from "@/component/Footer";
import QueryProvider from "@/core/component/QueryProvider";
import SessionProvider from "@/core/component/SessionProvider";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from "react-toastify";
import { CartCountProvider } from "@/core/context/useCartCount";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import FavIcon from "../../public/favicon.ico";
import ClientWrapper from "@/component/ClientWrapper"; 
import { fetchMenuCategories } from "@/core/helpers/serverActions";

export const metadata: Metadata = {
  title: {
    template: "%s | Welcome to Saawree Art!",
    default: "Welcome to Saawree Art!", // default if no title is set
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menuCategories = await fetchMenuCategories();
  return (
    <html lang='en'>
      <head>
        {/* <title>Index</title> */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {/* <link rel='stylesheet' href='/bootstrap/bootstrap.min.css' /> */}
        <link rel='shortcut icon' href={FavIcon.src} />
      </head>

      <body>
        <SessionProvider>
          <QueryProvider>
            <CartCountProvider>
              <PrimeReactProvider>
                <SpeedInsights />
                <Suspense fallback={<Loading />}>
                <ClientWrapper menuCategories={menuCategories}>{children}</ClientWrapper></Suspense>
                <Footer />
                <ToastContainer />
              </PrimeReactProvider>
            </CartCountProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
