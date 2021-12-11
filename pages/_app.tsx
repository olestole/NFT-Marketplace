import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import NavigationDrawer from "../components/NavigationDrawer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen min-h-screen">
      <NavigationDrawer />
      <div className="flex w-full h-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
