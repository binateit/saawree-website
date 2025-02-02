import "../../public/bootstrap/bootstrap.min.css";
// import "@/assets/fontawesome/css/all.min.css";
// import "@/assets/slik/slick.css";
import "@/assets/css/navbar.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import QueryProvider from "@/core/component/QueryProvider";
import SessionProvider from "@/core/component/SessionProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from "react-toastify";
import { CartCountProvider } from "@/core/context/useCartCount";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "CDN Example",
//   description: "Demonstrating CDN integration",

//   other: {
//     // External CSS CDN
//     link: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css",
//     // External JavaScript CDN
//   },
// };
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>Index</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {/* <link rel='stylesheet' href='/bootstrap/bootstrap.min.css' /> */}
      </head>

      <body>
        <SessionProvider>
          <QueryProvider>
            <CartCountProvider>
              <PrimeReactProvider>
                <SpeedInsights />
                <Header />
                <Suspense fallback={<Loading />}>{children}</Suspense>
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
