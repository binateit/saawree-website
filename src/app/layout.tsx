import Head from "next/head";
import "@/assets/bootstrap/bootstrap.min.css";
import "@/assets/fontawesome/css/all.min.css";
import "@/assets/slik/slick.css";
import "./globals.css";
import "@/assets/css/navbar.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import QueryProvider from "@/core/component/QueryProvider";
import SessionProvider from "@/core/component/SessionProvider";
import { getServerSession } from "next-auth";
// import "bootstrap/dist/css/bootstrap.min.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <Head>
        <title></title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
        />
      </Head>
      <SessionProvider session={session}>
        <QueryProvider>
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </QueryProvider>
      </SessionProvider>
    </html>
  );
}
