import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/header/nav";
import SubMenu from "../components/header/Submenu";
import Footer from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="NavBar">
        <Nav />
        <SubMenu />
      </div>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
