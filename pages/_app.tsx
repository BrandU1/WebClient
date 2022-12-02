import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@components/header/nav";
import SubMenu from "@components/header/Submenu";
import Footer from "@components/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [front] = useState(() => new QueryClient());

  return (
    <div>
      <QueryClientProvider client={front} contextSharing={true}>
        <div className="NavBar z-40 sticky transition top-0 border-b-[1px] border-gray">
          <Nav />
          <SubMenu />
        </div>
        <div className="max-w-4xl m-auto">
          <Component {...pageProps} />
        </div>

        <Footer />
      </QueryClientProvider>
    </div>
  );
}
