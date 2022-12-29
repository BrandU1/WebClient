import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@components/header/nav";
import SubMenu from "@components/header/Submenu";
import Footer from "@components/footer";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [front] = useState(() => new QueryClient());

  return (
    <div>
      <RecoilRoot>
        <QueryClientProvider client={front} contextSharing={true}>
          <Hydrate state={pageProps.dehydratedState}>
            <div className="NavBar z-40 sticky transition top-0 border-b-[1px] border-gray">
              <Nav />
              <SubMenu />
            </div>
            <div id="main-view" className="max-w-4xl m-auto">
              <Component {...pageProps} />
            </div>

            <Footer />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}
