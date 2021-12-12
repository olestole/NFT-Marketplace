import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavigationDrawer from "../components/Navigation/NavigationDrawer";
import Backdrop from "../assets/Backdrop.svg";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex w-screen min-h-screen">
      <Backdrop className="absolute -z-50 h-screen w-screen" />
      <div className="z-50 w-full min-h-screen">
        <Component {...pageProps} />
      </div>
      <NavigationDrawer />
    </div>
  );
}

export default MyApp;
